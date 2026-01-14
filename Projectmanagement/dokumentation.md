# Kollegen Dokumentation
## Frontend

### 1. Tech Stack
* **Core:** Vue 3 (Composition API) mit Vite als Build-Tool.
* **State & Routing:** Pinia für globalen State, Vue Router für die Navigation.
* **Styling:** Tailwind CSS 4 & SASS für das Interface.
* **API:** Axios für die Kommunikation mit dem Backend.

### 2. Architektur und Laout
Die Anwendung nutzt ein hierarchisches Layout-System:
* **AuthLayout:** Für Login- und Registrierungsseiten.
* **AppLayout:** Hauptansicht inklusive NavBar und SideBar.

### 3. Ordnerstruktur 
* **/api**: Zentrale API-Definitionen (request.js) und Ressourcen-Routen (users, chats, etc.)
* **/components**: Wiederverwendbare Elemente wie Chat, NavBar und SideBar.
* **/stores**: Zentraler State .
* /views: Page-Komponenten, strukturiert nach Features (z.B. `new_org`, `new_group`).

### 5. Befehle
* `npm install`: Abhängigkeiten laden.
* `npm run dev`: Entwicklungs-Server starten.
* `npm run build`: Produktions-Build in **dist** erstellen.

## Backend
### 1. Technologie-Stack
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/) 
* **Datenbank:** [MariaDB](https://mariadb.org/) 
* **Prozess-Management:** [PM2](https://pm2.keymetrics.io/)
* **Testing:** [Jest](https://jestjs.io/)

### 2. Datenbankstruktur
![alt text](<dbStrucutre.png>)


### 3. Projektstruktur
| Verzeichnis | Inhalt / Zweck |
| :--- | :--- |
| `src/database/` | Beinhaltet das `schema.sql` zur Initialisierung der Datenbank. |
| `src/routes/` | Definition der API-Endpunkte (Users, Orgs, Chats). |
| `src/tests/` | Automatisierte Unit- und Integrationstests. |
| `server.js` | Einstiegspunkt der Anwendung und Server-Konfiguration. |

## 4. Setup & Entwicklung
Um das Backend lokal für die Entwicklung vorzubereiten:

1.  **Abhängigkeiten:** `npm install`
2.  **DB-Setup:** `src/database/schema.sql` in die lokale MariaDB importieren.
3.  **Start:** `npm start` oder `node server.js`
4.  **Tests:** `npm test`


## Dev-Ops
### 1. Repository & Branching
* **Monorepo:** Frontend (Vue.js) und Backend (Node.js) befinden sich in einem Repository.
* **Branching-Strategie:** * `main`: Release-Branch und Projektmanagement.
    * `testing`, `Dev`, `Backend`, `Frontend`, : Integrations- und Entwicklungs-Branches.

### 2. Environment-Konzept
Einsatz von zwei isolierten Umgebungen über GitHub Environments:
* **Testing:** Automatisierte Testumgebung innerhalb der GitHub-Pipeline unter Verwendung von MariaDB-Service-Containern.
* **Deployment (Production):** Live-Umgebung auf dem Zielserver, geschützt durch verschlüsselte SSH-Secrets.

### 3. Pipeline-Stages (Multi-Stage)
Pipeline ist in vier Stages unterteilt:

1. **Build (Frontend):** Installation der Node-Module und Kompilierung der Vue-App zu statischen Dateien (`dist`).
2. **Test (Backend):** * Paralleler Start einer MariaDB-Testdatenbank.
    * Automatisierter Import des Datenbankschemas (`schema.sql`).
    * Validierung der API-Logik mittels `npm test`.
3. **Quality-Gate:** Automatischer Abbruch der Pipeline bei Fehlschlägen in den Tests oder beim Build, um fehlerhafte Deployments zu verhindern.
4. **Deployment:** * Synchronisation der Dateien via `rsync`.
    * **Konfigurationsschutz:** Ausschluss von `.env`-Dateien beim Sync, um Server-Settings zu bewahren.
    * **Process-Management:** App-Neustart via **PM2** für Verfügbarkeit

### 4. Provider 
* **CI/CD Provider:** GitHub Actions.
* **Hosting:** Ubuntu Webserver (Julian)
* **Webadresse:** Die Webseite kann unter ``https://kollegen.amschwand.com/`` aufgerufen werden.


## Projektmanagement

### 1. Kanban
Kanban wurde als Projektmethodik gewählt und im Verlauf des Projekt genutzt und gepflegt.
* **Einladung:** Einladungslink wurde bereits in Statusbericht1 & Statusbericht2 geteilt. [Einladungslink](https://miro.com/welcomeonboard/WGw5Tlk2aGxjd08rV0htMUVrQmpZMVZIcUVJTDdtaURKYW1iOTREYkFnZXVUbjJPV0t2OTZ1TFQ3YlVjWTM2dFR5Y0ViSzBlS2RzYUdwVlkvUUZxa005SWx3RWhSOCtuYXZHSEc3YnRBVEY4VklOOFRkVTZpUnhodTNyQUVyRFpQdGo1ZEV3bUdPQWRZUHQzSGl6V2NBPT0hdjE=?share_link_id=305692381936)


### Statusberichte

* **Statusbericht1:** Der Statusbericht wurde per Mail versendet. [Statusbericht1](status-report1.md)
* **Statusbericht2:** Der Statusbericht wurde per Mail versendet. [Statusbericht2](status-report2.md)
* **Statusbericht3:** Der Statusbericht nicht abgegeben. [Statusbericht3](status-report2.md)


### UserStories
UserStories wurden erstellt und zugewiesen und zugeteilt.

# User Stories - Projekt "Kollegen"

| ID | Funktionalität | User Story (Als ..., möchte ich ..., um ...) | Zuweisung |
| :--- | :--- | :--- | :--- |
| **US01** | **Authentifizierung** | Als Nutzer möchte ich mich registrieren und einloggen können, um geschützten Zugriff auf meine Organisationen und Daten zu erhalten. | **Janik**, **Julian** |
| **US02** | **Org-Erstellung** | Als Nutzer möchte ich neue Organisationen erstellen oder bestehenden beitreten können, um einen zentralen Arbeitsraum für meine Teams zu definieren. | **Pascal**, **Julian** |
| **US03** | **Org-Switching** | Als Nutzer möchte ich nahtlos zwischen meinen Organisationen wechseln können, damit mir die jeweils relevanten Gruppen und Kontakte angezeigt werden. | **Pascal**, **Julian**  |
| **US04** | **Gruppenverwaltung** | Als Nutzer möchte ich innerhalb einer Organisation Gruppen anlegen und verwalten können, um die Zusammenarbeit thematisch zu strukturieren. | **Janik**, **Julian**  |
| **US05** | **Kanal-Kommunikation**| Als Mitglied einer Gruppe möchte ich in Kanälen chatten und Dateien (Bilder/Dokumente) hochladen können, um mich effizient mit dem Team auszutauschen. | **Janik**, **Julian** |
| **US06** | **Direktnachrichten** | Als Nutzer möchte ich private Nachrichten an einzelne Mitglieder meiner Organisation senden können, um diskrete Kommunikation zu ermöglichen. | **Pascal**, **Julian**  |
| **US07** | **Globale Suche** | Als Nutzer möchte ich über ein zentrales Suchfeld nach Personen in meiner Organisation suchen können, um schnell einen Chat-Kontakt herzustellen. | **Pascal**, **Julian**  |
| **US08** | **Profil-Management** | Als Nutzer möchte ich mein Profilbild und meinen Benutzernamen anpassen können, um meine Identität auf der Plattform zu pflegen. | **Janik**, **Julian**  |
| **US09** | **App-Navigation** | Als Nutzer möchte ich über eine statische Navbar jederzeit zwischen Gruppen, Chats und Einstellungen wechseln können. | **Pascal**, **Julian**  |
| **US10** | **Chat-Historie** | Als Nutzer möchte ich alle Nachrichten in chronologischer Reihenfolge sehen, um den Überblick über vergangene Gespräche zu behalten. | **Janik*, **Julian** |