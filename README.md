Tää on [HY:n kurssin](https://fullstackopen.com) palautusrepo.

# Apu tarkastajille

Koska aion laajentaa aiempia tehtäviä suoraan, niin kantsii reposta tiettyjen committien kohdalla tehdä arvostelua, alla linkkien/komentojen avulla.

- [osa 1](https://github.com/tomjtoth/fullstack-open/tree/3493be93cbad420d792d767cb45ba05d9b79ba72)
    - `git checkout 3493be93cbad420d792d767cb45ba05d9b79ba72`

- [osa 2](https://github.com/tomjtoth/fullstack-open/tree/da34e8f09ae3bbd7d1c84ad264242a5f98af46ca)
    - `git checkout da34e8f09ae3bbd7d1c84ad264242a5f98af46ca`
    - tehtävä 2.20 skipattu

- [osa 3](https://github.com/tomjtoth/fullstack-open/tree/c7444d421ab33108ba07dffef60a107c2e9f1829)
    - `git checkout c7444d421ab33108ba07dffef60a107c2e9f1829`
    - puhelinluetteo deplattu [tänne](https://apps.ttj.hu/puhelinluettelo)
        - pyörii Docker:ssa toisen container:in (nginx reverse proxy) takana
        - päivitykset hoitaa watchtower
    - 3.12:stä eteenpäin käytän paikallisen mongo docker containerin, laita päälle [näin](./osa3/puhelinluettelo-backend/mongo-db.sh)
    - docker compose:in sisällä (kahden containerin välillä) en käytä mongoDB:n auth:ia, koska se käyttäytyy omituisesti
        - lue kommentti [tässä](./osa3/puhelinluettelo-backend/models/person.js)

- [osa 4]()
    - `git checkout `
        - tehtävä `4.1`: jälleen menin mongo-db:n docker kuvakkeella joka on etukäteen käynnistettävä kuten osassa 3
    - tehtävät `4.{4-7}` palauttaa KAIKEN kriteeria tyydyttävää ehdokasta
