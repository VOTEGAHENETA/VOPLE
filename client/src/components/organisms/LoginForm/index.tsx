import React, { useState } from 'react';
import { InputField } from '@/components/molecules/InputField/index.tsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 유효성 검사
    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    // 폼 제출 로직
    console.log('로그인 시도:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id='email'
        label='이메일'
        placeholder='이메일을 입력하세요'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        id='password'
        label='비밀번호'
        type='password'
        placeholder='비밀번호를 입력하세요'
        variant={error ? 'error' : 'default'}
        errorMessage={error}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit'>로그인</button>
    </form>
  );
}
