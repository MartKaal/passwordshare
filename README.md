# PasswordShare

PasswordShare is een veilige webapplicatie voor het delen van wachtwoorden. De backend is gebouwd met Laravel (PHP) en de frontend met React (TypeScript). Hiermee kun je eenvoudig en veilig gevoelige informatie delen, met opties voor vervaldatum en toegangsbeheer.

## Functionaliteiten

- Deel wachtwoorden veilig met anderen
- Stel een vervaldatum in voor gedeelde wachtwoorden

## Gebruikte technologieën

- Laravel (PHP)
- React (TypeScript)
- Pest (PHP testen)
- Vite (Frontend build tool)
- SQLite (ontwikkelingsdatabase)

## Aan de slag

### Vereisten

- PHP >= 8.1
- Composer
- Node.js & npm

### Installatie

1. Clone de repository:
    ```sh
    git clone https://github.com/MartKaal/passwordshare.git
    cd passwordshare
    ```
2. Installeer PHP-afhankelijkheden:
    ```sh
    composer install
    ```
3. Installeer Node.js-afhankelijkheden:
    ```sh
    npm install
    ```
4. Kopieer het voorbeeld .env bestand en configureer:
    ```sh
    cp .env.example .env
    ```
    Pas database en andere instellingen aan in `.env` indien nodig.
5. Genereer een applicatiesleutel:
    ```sh
    php artisan key:generate
    ```
6. Voer de migraties uit:
    ```sh
    php artisan migrate
    ```
7. Bouw de frontend assets:
    ```sh
    npm run build
    ```
8. Start de ontwikkelserver:
    ```sh
    php artisan serve
    ```
    of
    ```sh
    composer run dev
    ```

## Testen uitvoeren

- Backend (Pest):
    ```sh
    ./vendor/bin/pest
    ```

## Werking van applicatie

Ga naar `http://localhost:8000/share` (of waar je de applicatie hebt draaien) in je browser. Vul het wachtwoord in dat je wilt delen, kies het aantal toegestane keren dat het wachtwoord bekeken mag worden en stel een vervaldatum in. Klik vervolgens op de knop om het wachtwoord te genereren.

Je krijgt een unieke link te zien. Kopieer deze link en stuur hem naar degene met wie je het wachtwoord wilt delen. De ontvanger kan het wachtwoord bekijken zolang het binnen het ingestelde aantal keren en vóór de vervaldatum is.

## Projectstructuur

- `app/` - Laravel applicatiecode (Controllers, Models, Services)
- `resources/js/` - React frontend code
- `database/` - Migraties, factories
- `routes/` - Route definities
- `tests/` - Test suites

## Licentie

Dit project valt onder de MIT-licentie.
