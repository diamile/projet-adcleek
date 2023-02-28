const weatherUtils = {};

weatherUtils.getIconByCode = function (weatherCode) {
  const iconByCode = [
    { icon: 'sun', codes: [0, 1, 2] },
    { icon: 'cloud-sun', codes: [3, 4, 5] },
    { icon: 'cloud-rain', codes: [10, 11, 13, 14, 30, 31, 210, 211] },
    {
      icon: 'cloud-rain-heavy',
      codes: [
        12, 15, 32, 40, 41, 42, 43, 44, 45, 46, 47, 48, 70, 71, 72, 73, 74, 75,
        76, 77, 78, 212,
      ],
    },
    { icon: 'cloud-fog2', codes: [6, 7, 16] },
    {
      icon: 'cloud-snow',
      codes: [
        20, 21, 22, 60, 61, 62, 63, 64, 65, 66, 67, 68, 221, 222, 230, 231, 232,
        235,
      ],
    },
    {
      icon: 'cloud-lightning',
      codes: [
        100, 101, 102, 103, 104, 105, 106, 107, 108, 120, 121, 122, 1232, 124,
        125, 126, 127, 128,
      ],
    },
    {
      icon: 'cloud-lightning-rain',
      codes: [130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142],
    },
  ];
  if (weatherCode === undefined || weatherCode === null) {
    console.error(
      'getIconForWeatchCode take weather code as argument, received null or undefined'
    );
    return null;
  }
  let iconByCodeItem = iconByCode.find((item) =>
    item.codes.includes(weatherCode)
  );
  if (iconByCodeItem) {
    return iconByCodeItem.icon;
  }
  console.error('Matching icon not found for code', weatherCode);
  return null;
};

module.exports = weatherUtils;
