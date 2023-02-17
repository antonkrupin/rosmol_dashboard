const apiPath = 'http://bossofcreeps.site/datastorage/';

export default {
  areas: () => [apiPath, 'areas'].join('/'),
  criteria: () => [apiPath, 'criteria'].join('/'),
  sections: () => [apiPath, 'sections'].join('/'),
  datastorageId: (id) => [apiPath, `${id}`].join('/'),
}