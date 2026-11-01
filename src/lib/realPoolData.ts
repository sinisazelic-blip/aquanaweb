// REAL DATA FROM X:\PoolManager\dev.db
export interface ClubItem {
  id: string;
  name: string;
  shortName: string;
  type: string;
  typeLabel: string;
}

export interface PoolItem {
  id: string;
  name: string;
  length: number;
  totalLanes: number;
}

export const realClubs: ClubItem[] = [
  {
    "id": "club-buk-spasilacka-sluzba",
    "name": "Ronilački klub BUK (Spasilačka služba)",
    "shortName": "RK BUK",
    "type": "LIFEGUARD_SERVICE",
    "typeLabel": "Ronilački klub i Spasilačka služba"
  },
  {
    "id": "ed28fc77-b964-47e6-93cb-b21b2cefdd06",
    "name": "Akademski plivački klub 22. April",
    "shortName": "APK 22. April",
    "type": "SWIMMING",
    "typeLabel": "Plivački klub"
  },
  {
    "id": "bcfe28a1-85cf-4808-8c36-2e9ee4559a13",
    "name": "Plivački klub AquaStar",
    "shortName": "AquaStar",
    "type": "SWIMMING",
    "typeLabel": "Plivački klub"
  },
  {
    "id": "2f182dfa-f1a0-4b20-aa15-d8a47da0eb37",
    "name": "Plivački klub Borac",
    "shortName": "PK Borac",
    "type": "SWIMMING",
    "typeLabel": "Plivački klub"
  },
  {
    "id": "bb0a0bdc-b911-4fb9-b923-ccccbd2208ca",
    "name": "Plivački klub Delfin",
    "shortName": "PK Delfin",
    "type": "SWIMMING",
    "typeLabel": "Plivački klub"
  },
  {
    "id": "14e13f67-3de1-427b-b4d4-1a1cacf3824a",
    "name": "Plivački klub Kruna",
    "shortName": "PK Kruna",
    "type": "SWIMMING",
    "typeLabel": "Plivački klub"
  },
  {
    "id": "e08d666e-0c00-45d6-be45-f4dabf65ad91",
    "name": "Plivački klub Olymp",
    "shortName": "PK Olymp",
    "type": "SWIMMING",
    "typeLabel": "Plivački klub"
  },
  {
    "id": "6040e77f-469e-4d12-9a84-bb3c1e513d1b",
    "name": "Vaterpolo klub Banja Luka",
    "shortName": "VK Banja Luka",
    "type": "WATER_POLO",
    "typeLabel": "Vaterpolo klub"
  },
  {
    "id": "978745fd-fb1a-4088-9638-931c326df2d8",
    "name": "Vaterpolo klub Borac",
    "shortName": "VK Borac",
    "type": "WATER_POLO",
    "typeLabel": "Vaterpolo klub"
  },
  {
    "id": "bbb9907c-b6ce-4e2a-94fd-281ee6549f8c",
    "name": "Vaterpolo klub Incel",
    "shortName": "VK Incel",
    "type": "WATER_POLO",
    "typeLabel": "Vaterpolo klub"
  }
];

export const realPools: PoolItem[] = [
  {
    "id": "cd6f75c5-8405-4b54-a33e-7177bb0637a8",
    "name": "Gradski olimpijski bazen (GOB) - Veliki bazen (50m)",
    "length": 50,
    "totalLanes": 10
  },
  {
    "id": "1b8a5d3f-563b-4c28-98e3-5182937cd2ab",
    "name": "Gradski olimpijski bazen (GOB) - Mali bazen (25m - poprečno)",
    "length": 25,
    "totalLanes": 20
  },
  {
    "id": "5a80cfba-0c19-4e49-b2c6-8208a11befc3",
    "name": "Gradski olimpijski bazen (GOB) - Mali bazen za rasplivavanje",
    "length": 25,
    "totalLanes": 5
  },
  {
    "id": "32af1468-77e2-4b42-98b4-2f5a38a92a25",
    "name": "Vodeni park Aquana - Otvoreni bazen",
    "length": 25,
    "totalLanes": 5
  }
];
