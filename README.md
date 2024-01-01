# SpotifyApp
using spotify apis created this project
### Requests
Data resources are accessed via standard HTTP requests in UTF-8 format to an API endpoint. The Web API uses the following HTTP verbs:

| Method | Action                                       |
| ------ | -------------------------------------------- |
| GET    | Retrieves resources                          |
| POST   | Creates resources                            |
| PUT    | Changes and/or replaces resources or collections |
| DELETE | Deletes resources                            |

available_markets: [
      'AR', 'AU', 'AT', 'BE', 'BO', 'BR', 'BG', 'CA', 'CL', 'CO',
      'CR', 'CY', 'CZ', 'DK', 'DO', 'DE', 'EC', 'EE', 'SV', 'FI',
      'FR', 'GR', 'GT', 'HN', 'HK', 'HU', 'IS', 'IE', 'IT', 'LV',
      'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NI', 'NO', 'PA',
      'PY', 'PE', 'PH', 'PL', 'PT', 'SG', 'SK', 'ES', 'SE', 'CH',
      'TW', 'TR', 'UY', 'US', 'GB', 'AD', 'LI', 'MC', 'ID', 'JP',
      'TH', 'VN', 'RO', 'IL', 'ZA', 'SA', 'AE', 'BH', 'QA', 'OM',
      'KW', 'EG', 'MA', 'DZ', 'TN', 'LB', 'JO', 'PS', 'IN', 'BY',
      'KZ', 'MD', 'UA', 'AL', 'BA', 'HR', 'ME', 'MK', 'RS', 'SI',
      'KR', 'BD', 'PK', 'LK', 'GH', 'KE', 'NG', 'TZ', 'UG', 'AG',
]

### How To Run The Project
1. Go to github url and git clone the project from the following url
* ```git clone https://github.com/suryatalemonika/SpotifyApp```
2. Now you have to go to the directory where your package.json file available and install all the necessary node modules for the project using following command on your terminal
* ```cd SpotifyApp```
* ```npm install```
3. Now just enter the following two commands in different terminals for starting our project
* ```npm run test```          (current terminal)
* ```http-server```            (open another terminal and run this command)