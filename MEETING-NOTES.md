# Meeting Notes – [Esc] Hacker Escape Rooms, Grupp 2

## 2026-11-10 Pre-möte
Närvarande: Elin, Filip, Samuel
Antecknare: Elin

Beslut:
- Grupp 2 siktar på VG.
- Kommunikation: Teamsgrupp, möten och chatt. Allt underlag samlas i Teams.
- Samordnare: Filip
- Antecknare: Elin
- Befintlig kod: Filips
- Uppstartsmöte: 11/11 kl. 17.00

## 2026-11-11 Uppstartsmöte
Närvarande: Samuel, Filip, Elin, Yasir, Fabian

Beslut:
- Vi arbetar i GitHub Projects och fördelar arbetsuppgifterna där.
- Preliminära möten tisdag och onsdag, exakta tider bestäms löpande.
- Övrig kommunikation i Teamsgruppen.
- Vi utgår från Filips kod. Alla har en egen branch i hans repo.

## 2026-11-16 Fördelning (via chatt)
- Filip: moment 1, API och kort.
- Elin: moment 2, filter.
- Moment 3, bokning: bestäms på nästa möte.


## 2026-11-17 Möte
Närvarande: Samuel, Filip, Elin, Fabian

Filip visade sin kod: challenges.html och challenges.js (hämtar data från API:et och bygger korten). Han pushar dem till repot så att alla kan utgå från dem.
Fördelning: Filip moment 1 (API och kort), Elin moment 2 (filter), Samuel och Fabian moment 3 (bokning).



2026-11-23 Uppdatering (via chatt)
- Elin: filtret. Typfilter klart, pull request till main i dag. Rating, etiketter och fritext tisdag–onsdag.
- Samuel: B.8 "No matching challenges", 4.1 testning (TESTING.md), 4.2 buggfix.
- Fabian: bokning steg 1 klar (popup, datumval, getAvailableTimes hämtar lediga tider).
- Yasir: bokning steg 2 (formulär med namn, e-post, tid, deltagare) och koppling till lediga tider.
- Möte tisdag 24/11
- Redovisning och inlämning fredag 27/11.



2026-11-24 Möte
Närvarande: Filip, Elin, Samuel, Fabian

- Filip: moment 1 (API och kort) klart sedan tidigare. Under mötet lade han till allChallenges i challenges.js, så att filtret kan använda riktig data (PR #3). Kortlayouten i mobilvyn fixad (PR #4).
- Fabian: bokning steg 1 klar och mergad till main.
- Yasir /via chatt 23/11/  i princip klar med sin del av bokningen. Koden ligger i branch fabian. Kvarstående, koppla listan med lediga tider till rullgardinsmenyn för tid i steg 2.
- Elin: filter med typ (online/on-site) och betyg (from) klart, PR #2. Hämtat main till sin branch. Fortsätter med betyg , etiketter och fritext, och byter sedan till riktig data (allChallenges).
- Samuel: har korten B.8 "No matching challenges", 4.1 testning och 4.2 buggfix. B.8 påbörjad i branch samuel-no-matches.

Beslut:
- Review: Elin granskar Filips pull request/vv och  Samuel granskar Fabians/vv
- Yasirs review bestäms tillsammans med honom.

Nästa möte: Onsdag 12.00
