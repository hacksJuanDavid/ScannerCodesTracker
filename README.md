## Description of the project

```
Create a scanner app with scanner codes with camera and get the information of the code qr and geolocation and tracking the location of the user when scan the multiple codes qr.
```

## Requirements for the project

```
[x] Scanner qr code with camera
[x] Get the information of the code qr
[x] Get the geolocation of the user
[] Tracking the location of the user when scan the multiple codes qr and create a route, >= 1 kilometers
[] Save the information of the code qr in the local storage
[] View the tracking of the user in the map
[] Rewars the user when scan the multiple codes qr, >= 4
```

## Structure of object code qr

```
{
  "IdQR": "1",
  "ContentInQR": "This is a description of the code qr",
  "latitude": 0.0,
  "longitude": 0.0,
  "date": "2021-01-01T00:00:00.000Z"
}
```

## Create app with capacitor

```
npx ionic start ScannerCodesWithCameraApp blank --type=react --capacitor
```

## Add libraries configuration app natives

```
yarn add @capacitor/android
```

## Last step

```
npx cap add android
```

## Install plugin

```
 yarn add @capacitor-mlkit/barcode-scanning
```

## Last step

```
npx ionic cap sync
```

## Open android studio

```
npx cap open android
```

## Build app

```
npx ionic build
```
