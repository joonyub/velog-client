import React, { useState } from 'react';
import SettingRow from './SettingRow';
import {
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  EmailIcon,
} from '../../static/svg';
import { MdHome } from 'react-icons/md';
import styled from 'styled-components';
import Button from '../common/Button';
import SettingInput from './SettingInput';
import useInputs from '../../lib/hooks/useInputs';
import palette from '../../lib/styles/palette';

export type SettingSocialInfoRowProps = {
  email?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  url?: string;
};

const iconArray = [
  EmailIcon,
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  MdHome,
];

function SettingSocialInfoRow({
  email,
  github,
  twitter,
  facebook,
  url,
}: SettingSocialInfoRowProps) {
  const infoArray = [email, github, twitter, facebook, url];
  const empty = infoArray.every(value => !value);
  const [edit, setEdit] = useState(false);
  const [form, onChange] = useInputs({ email, github, twitter, facebook, url });

  const infoInputsList = edit && (
    <Form>
      <InfoList>
        <li>
          <EmailIcon />
          <SettingInput
            value={form.email}
            onChange={onChange}
            name="email"
            placeholder="이메일을 입력하세요."
            fullWidth
          />
        </li>
        <li>
          <GithubIcon />
          <SettingInput
            value={form.github}
            onChange={onChange}
            name="github"
            placeholder="Github 계정을 입력하세요."
          />
        </li>
        <li>
          <TwitterIcon />
          <SettingInput
            value={form.twitter}
            onChange={onChange}
            name="twitter"
            placeholder="Twitter 계정을 입력하세요."
          />
        </li>
        <li>
          <FacebookSquareIcon />
          <FacebookInputBox tabIndex={0}>
            <span>https://www.facebook.com/</span>
            <input />
          </FacebookInputBox>
        </li>
        <li>
          <MdHome />
          <SettingInput
            value={form.url}
            onChange={onChange}
            name="url"
            placeholder="홈페이지 주소를 입력하세요."
            fullWidth
          />
        </li>
      </InfoList>
      <div className="button-wrapper">
        <Button>저장</Button>
      </div>
    </Form>
  );

  const infoValueList = !edit && (
    <InfoList>
      {infoArray.map((value, i) =>
        value ? (
          <li key={i}>
            {React.createElement(iconArray[i])}
            <span>{value}</span>
          </li>
        ) : null,
      )}
    </InfoList>
  );

  const onClickEdit = () => setEdit(true);

  return (
    <SettingRow
      title="소셜 정보"
      description="포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다."
      editButton={!edit}
      onClickEdit={onClickEdit}
    >
      {edit ? infoInputsList : infoValueList}
    </SettingRow>
  );
}

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    svg {
      width: 1rem;
      height: 1rem;
      font-size: 1rem;
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
    span {
      font-size: 1rem;
    }
  }
  li + li {
    margin-top: 0.5rem;
  }
`;

const FacebookInputBox = styled.div`
  flex: 1;
  display: flex;
  border: 1px solid ${palette.gray3};
  background: white;
  padding: 0.5rem;
  color: ${palette.gray7};
  font-size: 1rem;
  line-height: 1rem;
  outline: none;
  border-radius: 4px;
  height: 2.25rem;
  span {
    color: ${palette.gray5};
    margin-right: 0.25rem;
  }
  input {
    padding: 0;
    border: 0;
    outline: none;
    font-size: 1rem;
    line-height: 1;
    flex: 1;
  }
  &:has(input) {
    border: 1px solid ${palette.gray9};
  }
`;

const Form = styled.form`
  width: 25rem;
  li + li {
    margin-top: 1rem;
  }
  .button-wrapper {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }
`;

export default SettingSocialInfoRow;