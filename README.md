SOURCES USED FOR EACH MODEL

CNN DATA SOURCE: 
1. https://www.kaggle.com/datasets/abdelghaniaaba/wildfire-prediction-dataset

RNN/XGB DATA SOURCES:
1. https://open-meteo.com/en/docs/historical-weather-api
2. https://catalog.data.gov/dataset/national-usfs-fire-occurrence-point-feature-layer-d3233/resource/bebc3dbf-0aa8-4e98-aa99-b84dc33bb1bf
3. http://www.pymodis.org/index.html (for NDVI values)

PERFORMANCE FOR EACH MODEL

CNN PERFORMANCE:
1. binary_accuracy: 0.9655 - loss: 0.1231 (validation data)
2. binary_accuracy: 0.9740 - loss: 0.0827 (test data)

RNN PERFORMANCE: 
1. binary_accuracy: 0.84 - loss: 0.3729 (validation data)

XGB PERFORMANCE:
1. binary_accuracy: 0.85 (validation data)
