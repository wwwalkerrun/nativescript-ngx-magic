declare var NSObject, NSString, android, java;

const getFilepath = function (path: string) {
  return path.replace('.html', '').replace('.css', '');
};

const getPlatform = function (platformSpecific: boolean) {
  return platformSpecific ? (MagicService.IS_ANDROID() ? 'android' : 'ios') : 'tns';
};

export class MagicService {

  public static TEMPLATE_URL(path: string, platformSpecific?: boolean): string {
    if (MagicService.IS_NATIVESCRIPT()) {
      let filepath = getFilepath(path);
      let platform = getPlatform(platformSpecific);
      return `${filepath}.${platform}.html`;
    } else {
      return path;
    }
  }

  public static STYLE_URLS(paths: string[], platformSpecific?: boolean): string[] {
    if (MagicService.IS_NATIVESCRIPT()) {
      return paths.map((path) => {
        let filepath = getFilepath(path);
        let platform = getPlatform(platformSpecific);
        return `${filepath}.${platform}.css`;
      });
    } else {
      return paths;
    }
  }

  public static IS_NATIVESCRIPT() {
    return (MagicService.IS_IOS() || MagicService.IS_ANDROID());
  }

  public static IS_IOS() {
    return (typeof NSObject !== 'undefined' && typeof NSString !== 'undefined');
  }

  public static IS_ANDROID() {
    return (typeof android !== 'undefined' && typeof java !== 'undefined');
  }
}
