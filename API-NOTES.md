# API-notes

Basadress: https://lernia-sjj-assignments.vercel.app/api

## GET /challenges

Svar: { challenges: [ ... ] }

Fält per challenge:
- id: tal
- type: "online" | "onsite"
- title: text
- description: text
- minParticipants: tal
- maxParticipants: tal
- rating: 0–5
- image: url
- labels: [text]

## GET /booking/available-times?date=YYYY-MM-DD&challenge=ID

Svar: { date, slots: ["11:00", "12:30", ...] }

## POST /booking/reservations

Body (JSON):
- challenge: tal
- name: text
- email: text
- date: YYYY-MM-DD
- time: HH:mm
- participants: tal

Svar: { status: "ok", booking: { ... } }