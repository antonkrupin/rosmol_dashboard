const apiPath = 'http://bossofcreeps.site';

export default {
  names: () => [apiPath, 'datastorage', 'names/'].join('/'),
  areas: () => [apiPath, 'datastorage', 'areas/'].join('/'),
  criteria: () => [apiPath, 'datastorage', 'criteria/'].join('/'),
  sections: () => [apiPath, 'datastorage', 'sections/'].join('/'),
  datastorageId: (id) => [apiPath, 'datastorage', `${id}`].join('/'),
  reformatter: () => [apiPath, 'reformatter/'].join('/'),
}