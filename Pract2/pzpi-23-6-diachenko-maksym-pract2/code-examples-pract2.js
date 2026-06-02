/*
Запити до ШІ для практичного заняття №2:

1. Поясни архітектуру програмної системи Google Earth Engine українською мовою.
2. Опиши основні компоненти Google Earth Engine: клієнтський інтерфейс, серверну обробку, каталог даних, API та хмарну інфраструктуру.
3. Наведи приклад програмного коду для аналізу природних ресурсів за допомогою Google Earth Engine.
*/

// Приклад коду для Google Earth Engine JavaScript API.
// Код демонструє обчислення індексу NDVI для аналізу стану рослинності.

var region = ee.Geometry.Rectangle([36.0, 49.7, 36.5, 50.1]);

var imageCollection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(region)
    .filterDate('2024-06-01', '2024-08-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var image = imageCollection.median();

var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');

var ndviParameters = {
    min: -1,
    max: 1,
    palette: ['blue', 'white', 'green']
};

Map.centerObject(region, 10);
Map.addLayer(ndvi, ndviParameters, 'NDVI');

var meanNdvi = ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: region,
    scale: 10,
    maxPixels: 100000000
});

print('Середнє значення NDVI:', meanNdvi);
