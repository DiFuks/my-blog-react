import { DefaultFetchingStatuses } from '@app/common/constants';
import { PostTypes } from '@app/common/constants/postTypes';
import { IPost } from '@app/post/duck/reducer';
import { SubmenuStates } from '@app/submenu/duck/constants';
import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/hljs';
import styled, { css } from 'styled-components';

export interface IProps {
  url: string;
  changeActive: (url: string) => void;
  data: IPost;
  fetchStatus: DefaultFetchingStatuses;
  menuIsOpen: SubmenuStates;
}

export interface IPropsStyled {
  menuIsOpen: SubmenuStates;
}

export const Post: React.FunctionComponent<IProps> = ({url, changeActive, data, fetchStatus, menuIsOpen}) => {
  React.useEffect(() => {
    changeActive(url);

    return () => changeActive(null);
  }, [url]);

  if (fetchStatus === DefaultFetchingStatuses.IN_PROGRESS || fetchStatus === DefaultFetchingStatuses.NONE) {
    return (<div>Загрузка</div>);
  }

  if (fetchStatus === DefaultFetchingStatuses.FAILED) {
    return (<div>Ошибка</div>);
  }

  return (
    <PostStyled
      menuIsOpen={menuIsOpen}
    >
      <h1>{data.title}</h1>
      {data.content.map((content, index) => {
        if (content.type === PostTypes.TEXT) {
          return (
            <div
              key={`${content.type}${index}`}
              dangerouslySetInnerHTML={{__html: content.content}}
            />
          );
        }

        return (
          <SyntaxHighlighter
            key={`${content.type}${index}`}
            showLineNumbers={true}
            language={content.type}
            useInlineStyles={true}
            style={darcula}
          >
            {content.content}
          </SyntaxHighlighter>
        );
      })}
    </PostStyled>
  );
};

const PostStyled = styled.div<IPropsStyled>`
  height: 100%;
  overflow: scroll;
  line-height: 1.4;
  ${props => props.menuIsOpen === SubmenuStates.ACTIVE && css`
    overflow: hidden;
  `}
`;
