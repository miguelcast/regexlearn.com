import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import cx from 'classnames';

import checkRegex from 'src/utils/checkRegex';
import tagWrapper from 'src/utils/tagWrapper';
import { CheatsheetData } from 'src/types';

import styles from './CheatsheetDemo.module.css';

type CheatsheetDemoProps = {
  data: CheatsheetData;
};

const CheatsheetDemo = ({ data }: CheatsheetDemoProps) => {
  const [content, setContent] = useState('');
  const { formatMessage } = useIntl();
  const initialContent = data.content;

  const applyRegex = () => {
    const { $regex } = checkRegex(data, { regex: data.regex, flags: 'gmi' });

    if ($regex) {
      setContent(
        tagWrapper({
          value: initialContent,
          regex: $regex,
          attributes: { class: styles.CheatsheetDemoResultTag },
        }),
      );
    } else {
      setContent(initialContent);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(applyRegex, []);

  return (
    <div className={styles.CheatsheetDemo}>
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockContent)}
        data-title={formatMessage({ id: 'general.text' })}
        dangerouslySetInnerHTML={{
          __html: (content || initialContent).replace(/\\n/gm, '<br />'),
        }}
      />
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockRegex)}
        data-title={formatMessage({ id: 'general.regex' })}
      >
        <span className={styles.CheatsheetDemoHiglightText} data-flags={data.flags}>
          {data.regex}
        </span>
      </div>
    </div>
  );
};

export default CheatsheetDemo;
