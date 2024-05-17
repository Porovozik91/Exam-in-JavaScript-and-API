*Første side: Index.js
Spilldata fra RAWG API
Henter og viser spilldata fra RAWG API.
Inneholder søke- og filtreringsfunksjonalitet.
Mulighet til å navigere gjennom alle sider med spilldata fra API-en.
Tilgang til brukerkonto: Registrering, innlogging, eller direkte til samlingssiden for registrerte brukere.
Valg av et spill sender brukeren til en informasjonsside med spilldetaljer.
Ikke påkrevd å være logget inn for å se informasjonssiden.

*Informasjonsside: game-info.html
Spildetaljer
Viser detaljer om et valgt spill sendt fra den første siden med en spill-ID.
Mulighet til å legge til spill i sin spillkolleksjon hvis brukeren er autorisert.
Lagrer spill både i CRUD-API og lokalt i Local Storage.
Ingen pålogging kreves for å se spillinformasjon, men påkrevd for å legge til i samlingen.
Enkel navigasjon mellom alle sider.

*Samlingsside: my-collection
Administrasjon av spillkolleksjon.
Tillater brukere å slette og endre spilldetaljer i sin samling.
Bruker to separate JavaScript-filer for endring og sletting av spill, en for API og en for Local Storage.
Lokalt lagrede spill vises kun for den autoriserte brukeren som la dem til i samlingen.
Autorisasjon kreves for å se spill i samlingen.

*Autorisasjon side: accaount.html 
Siden er for registrering og innlogging.
Tilhørende filer: 
register.js: Lar brukeren registrere seg og lagrer registreringsinformasjonen i CRUD API. 
login.js: Tillater brukeren å logge inn ved å hente lagret brukerinformasjon fra CRUD API.


*userChek.js
Verifiserer brukerens innloggingsstatus og begrenser tilgangen 
til funksjoner som å legge til spill i spillsamlingen og visning av samlingssiden for uautoriserte brukere.
Lagrer og henter spill basert på brukerens personlige spillkatalog i spillsamlingssiden fra local storage.
