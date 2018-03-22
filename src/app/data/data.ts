export const units = [
  {
    name: 'Масса',
    pokemon: [
      {value: 'кг', viewValue: 'килограмм'},
      {value: 'г', viewValue: 'грамм'},
      {value: 'т', viewValue: 'тонна'}
    ]
  },
  {
    name: 'Температура',
    pokemon: [
      {value: 'squirtle-3', viewValue: 'Squirtle'},
      {value: 'psyduck-4', viewValue: 'Psyduck'},
      {value: 'horsea-5', viewValue: 'Horsea'}
    ]
  },
  {
    name: 'Расстояние',
    disabled: true,
    pokemon: [
      {value: 'charmander-6', viewValue: 'Charmander'},
      {value: 'vulpix-7', viewValue: 'Vulpix'},
      {value: 'flareon-8', viewValue: 'Flareon'}
    ]
  },
  {
    name: 'Площадь',
    pokemon: [
      {value: 'mew-9', viewValue: 'Mew'},
      {value: 'mewtwo-10', viewValue: 'Mewtwo'},
    ]
  },
  {
    name: 'Объём',
    pokemon: [
      {value: 'mew-9', viewValue: 'Mew'},
      {value: 'mewtwo-10', viewValue: 'Mewtwo'},
    ]
  }
];

export const typeOfDocument = [
  {
    id: 1,
    name: 'Нестрогая отчетность',
    documents:
      [
        {document: 'Акт приёмки-сдачи выполненных работ'},
        {document: 'Счёт-фактура'}
      ]
  },
  {
    id: 2,
    name: 'Строгая отчетность',
    documents:
      [
        {document: 'Товарная накладная'},
        {document: 'Товарно-транспортная накладная'}
      ]
  }
];

export const states = ['CA', 'MD', 'OH', 'VA'];

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Whirlwind',
    addresses: [
      {street: '123 Main', city: 'Anywhere', state: 'CA', zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ]
  },
  {
    id: 2,
    name: 'Bombastic',
    addresses: [
      {street: '789 Elm', city: 'Smallville', state: 'OH', zip: '04501'},
    ]
  },
  {
    id: 3,
    name: 'Magneta',
    addresses: []
  },
];

export class Hero {
  id = 0;
  name = '';
  addresses: Address[];
}

export class Address {
  street = '';
  city = '';
  state = '';
  zip = '';
}
