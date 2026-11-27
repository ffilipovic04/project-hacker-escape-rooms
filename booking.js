(() => {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    const form = modal.querySelector('#booking-form');
    const title = modal.querySelector('#booking-title');
    const step1 = modal.querySelector('#booking-step-1');
    const dateInput = modal.querySelector('#booking-date');
    const nextButton = modal.querySelector('#booking-next');
    const errorMessage = modal.querySelector('#booking-error');

    let step2 = modal.querySelector('#booking-step-2');

    if (!step2) {
        step2 = document.createElement('fieldset');
        step2.id = 'booking-step-2';
        step2.innerHTML = `
            <legend>Your booking details</legend>

            <label for="booking-name">Name</label>
            <input id="booking-name" name="name" autocomplete="name" required>

            <label for="booking-email">Email</label>
            <input id="booking-email" name="email" type="email"
                   autocomplete="email" required>

            <label for="booking-time">Time</label>
            <select id="booking-time" name="time" required></select>

            <label for="booking-participants">Participants</label>
            <select id="booking-participants" name="participants" required></select>

            <button type="submit">Continue</button>
        `;
        form.append(step2);
    }

    const nameInput = step2.querySelector('#booking-name');
    const emailInput = step2.querySelector('#booking-email');
    const timeSelect = step2.querySelector('#booking-time');
    const participantsSelect = step2.querySelector('#booking-participants');

    let selectedRoom;
    let pendingRequest;

    function showStep(number) {
        step1.hidden = step1.disabled = number !== 1;
        step2.hidden = step2.disabled = number !== 2;
        title.textContent = 'Book room (step ' + number + ')';
    }

    function fillOptions(select, placeholder, values) {
        select.replaceChildren(new Option(placeholder, ''));

        for (const value of values) {
            select.add(new Option(String(value), String(value)));
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.hidden = !message;
    }

    function resetBooking() {
        pendingRequest?.abort();
        pendingRequest = undefined;
        form.reset();
        nextButton.disabled = false;
        showError('');
        showStep(1);
    }

    showStep(1);

    document.addEventListener('click', event => {
        const button = event.target.closest('.btn-card-red[data-id]');
        if (!button || modal.open) return;

        event.preventDefault();
        resetBooking();

        selectedRoom = {
            id: Number(button.dataset.id),
            min: Number(button.dataset.minParticipants),
            max: Number(button.dataset.maxParticipants)
        };

        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        dateInput.min = `${today.getFullYear()}-${month}-${day}`;
        modal.showModal();
    });

    modal.querySelector('#close-booking').addEventListener('click', () => modal.close());

    modal.addEventListener('close', () => {
        if (!modal.open) resetBooking();
    });

    nextButton.addEventListener('click', async () => {
        if (!dateInput.reportValidity() || pendingRequest) return;

        const room = selectedRoom;
        const date = dateInput.value;

        if (!Number.isInteger(room?.min) || !Number.isInteger(room?.max) ||
            room.min < 1 || room.max < room.min) {
            showError('Could not load participant limits for this room.');
            return;
        }

        showError('');
        const request = new AbortController();
        pendingRequest = request;
        nextButton.disabled = true;

        try {
            const params = new URLSearchParams({ challenge: room.id, date });
            const response = await fetch(
                'https://lernia-sjj-assignments.vercel.app/api/booking/available-times?' + params,
                { signal: request.signal }
            );

            if (!response.ok) throw new Error('HTTP ' + response.status);

            const { slots } = await response.json();
            if (!Array.isArray(slots)) throw new Error('Invalid slots');

            if (request !== pendingRequest || !modal.open || date !== dateInput.value) return;

            if (slots.length === 0) {
                showError('No available times for this date.');
                return;
            }

            fillOptions(timeSelect, 'Choose a time', new Set(slots));

            const participants = Array.from(
                { length: room.max - room.min + 1 },
                (_, index) => room.min + index
            );

            fillOptions(participantsSelect, 'Choose participants', participants);
            showStep(2);
            nameInput.focus();
        } catch (error) {
            if (request === pendingRequest && modal.open && date === dateInput.value) {
                showError('Could not load available times. Please try again.');
            }
        } finally {
            if (request === pendingRequest) {
                pendingRequest = undefined;
                nextButton.disabled = false;
            }
        }
    });

        const submitButton = step2.querySelector('button[type="submit"]');
    const closeButton = modal.querySelector('#close-booking');

    const submitError = document.createElement('p');
    submitError.setAttribute('role', 'alert');
    submitError.hidden = true;
    step2.append(submitError);

    const confirmation = document.createElement('section');
    confirmation.hidden = true;
    confirmation.innerHTML = `
        <p role="status">Thank you!</p>
        <button type="button">Close</button>
    `;
    form.append(confirmation);

    const confirmationClose = confirmation.querySelector('button');
    confirmationClose.addEventListener('click', () => modal.close());

    let submitting = false;

    modal.addEventListener('cancel', event => {
        if (submitting) event.preventDefault();
    });

    modal.addEventListener('close', () => {
        confirmation.hidden = true;
        submitError.hidden = true;
        nameInput.setCustomValidity('');
    });

    nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (submitting || !confirmation.hidden) return;

        if (step2.hidden) {
            nextButton.click();
            return;
        }

        const name = nameInput.value.trim();

        if (!name) {
            nameInput.setCustomValidity('Please enter your name.');
            nameInput.reportValidity();
            return;
        }

        const booking = {
            challenge: selectedRoom.id,
            date: dateInput.value,
            name,
            email: emailInput.value.trim(),
            time: timeSelect.value,
            participants: Number(participantsSelect.value)
        };

        submitting = true;
        submitButton.disabled = true;
        closeButton.disabled = true;
        submitError.hidden = true;

        try {
            const response = await fetch(
                'https://lernia-sjj-assignments.vercel.app/api/booking/reservations',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(booking)
                }
            );

            if (!response.ok) throw new Error('HTTP ' + response.status);

            const data = await response.json();
            if (data.status !== 'ok') throw new Error('Booking was not confirmed');

            step2.hidden = true;
            step2.disabled = true;
            title.textContent = 'Book room (step 3)';
            confirmation.hidden = false;
            confirmationClose.focus();
        } catch (error) {
            submitError.textContent = 'We could not confirm your booking. Please try again.';
            submitError.hidden = false;
        } finally {
            submitting = false;
            submitButton.disabled = false;
            closeButton.disabled = false;
        }
    });
})();