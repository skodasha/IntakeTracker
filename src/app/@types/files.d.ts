declare module '*.svg' {
  import { FC } from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  import { ImageRequireSource } from 'react-native';

  const value: ImageRequireSource;
  export default value;
}

declare module '*.jpg' {
  import { ImageRequireSource } from 'react-native';

  const value: ImageRequireSource;
  export default value;
}

declare module '*.jpeg' {
  import { ImageRequireSource } from 'react-native';

  const value: ImageRequireSource;
  export default value;
}

declare module '*.gif' {
  import { ImageRequireSource } from 'react-native';

  const value: ImageRequireSource;
  export default value;
}

declare module '*.mp4' {
  const value: number;
  export default value;
}
