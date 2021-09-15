
exports.seed = function (knex) {
  const initProductos = [
    {
      nombre: 'Shiratamako - Rice Flour',
      descripcion: 'Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Ius everti consectetuer et, meis mutat.',
      codigo: 'ECOM-2856-2940',
      precio: 120.68,
      foto: 'https://picsum.photos/300?random=1',
      stock: 44
    },
    {
      nombre: 'Squid - Tubes / Tenticles 10/20',
      descripcion: 'Nulla facilisi. Aenean sollicitudin sollicitudin magna, non tempus sem.',
      codigo: 'ECOM-3479-7869',
      precio: 121.7,
      foto: 'https://picsum.photos/300?random=2',
      stock: 16
    },
    {
      nombre: 'Tahini Paste',
      descripcion: 'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
      codigo: 'ECOM-9005-0919',
      precio: 476.66,
      foto: 'https://picsum.photos/300?random=3',
      stock: 93
    },
    {
      nombre: 'Truffle - Whole Black Peeled',
      descripcion: 'Vestibulum faucibus ex orci, at consectetur nulla malesuada vitae. Vestibulum purus orci, pulvinar ut pharetra non, feugiat at nulla.',
      codigo: 'ECOM-5673-0278',
      precio: 27.24,
      foto: 'https://picsum.photos/300?random=4',
      stock: 96
    },
    {
      nombre: 'Pork - Suckling Pig',
      descripcion: 'Nullam vitae euismod nisl. Ut imperdiet mauris libero, eget euismod lacus ultrices ac. Phasellus ut dolor dui. Phasellus lobortis fringilla sem, quis facilisis enim.',
      codigo: 'ECOM-2869-7181',
      precio: 9.69,
      foto: 'https://picsum.photos/300?random=5',
      stock: 13
    },
    {
      nombre: 'Container - Clear 16 Oz',
      descripcion: 'Duis posuere venenatis aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. In vestibulum tortor at magna malesuada tristique.',
      codigo: 'ECOM-1336-8501',
      precio: 478.15,
      foto: 'https://picsum.photos/300?random=6',
      stock: 36
    },
    {
      nombre: 'Sprouts - Bean',
      descripcion: 'Proin consectetur, dolor eu molestie faucibus, magna risus porta sapien, vitae ultricies lacus diam ut lectus. Aliquam quis velit dui.',
      codigo: 'ECOM-1801-5720',
      precio: 210.14,
      foto: 'https://picsum.photos/300?random=7',
      stock: 39
    },
    {
      nombre: 'Table Cloth 62x114 Colour',
      descripcion: 'Vestibulum at dui vitae odio aliquam lacinia nec sit amet elit. Aliquam quis leo eget est dapibus lobortis eu ac urna. Mauris at dui rutrum, egestas turpis vitae, gravida elit. ',
      codigo: 'ECOM-7757-5602',
      precio: 250.91,
      foto: 'https://picsum.photos/300?random=8',
      stock: 53
    },
    {
      nombre: 'Soup - Campbells, Lentil',
      descripcion: 'Nulla ac hendrerit ante. Maecenas sollicitudin velit ut malesuada rhoncus. Nullam iaculis vel diam ut euismod. Fusce egestas tellus a nulla venenatis, id vehicula ipsum egestas.',
      codigo: 'ECOM-9619-1404',
      precio: 55.55,
      foto: 'https://picsum.photos/300?random=9',
      stock: 2
    },
    {
      nombre: 'Lid Coffee Cup 8oz Blk',
      descripcion: 'Nullam tincidunt pellentesque justo. Cras nulla augue, efficitur nec pellentesque laoreet, egestas eu metus. Nulla sed mi non nisi aliquam malesuada.',
      codigo: 'ECOM-4585-6999',
      precio: 78.89,
      foto: 'https://picsum.photos/300?random=10',
      stock: 38
    }
  ];

  return knex('productos')
    .del()
    .then(() => knex('productos').insert(initProductos));
};
