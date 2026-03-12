"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { HelpLink } from "@/components/HelpLink";

export default function Home() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', name: '' });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && /^[A-Za-z0-9]+$/.test(password);
  };

  const validateEmailField = (email: string) => {
    if (!email) return 'Email обязателен';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
      return 'Введите корректный корпоративный e-mail';
    return '';
  };

  const validateNameField = (name: string) => {
    if (!name) return 'Имя обязательно';
    if (name.length < 2) return 'Имя должно содержать минимум 2 символа';
    return '';
  };

  const validatePasswordField = (password: string) => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
    if (!/^[A-Za-z0-9]+$/.test(password)) 
      return 'Пароль должен содержать только латиницу и цифры';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmailField(value) }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: validateNameField(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePasswordField(value) }));
  };

  return (
    <main className="w-full min-h-screen bg-[#E7EAFA] flex justify-center">
      <div className="w-full max-w-[360px] md:max-w-[1920px]">
        <Header />

        <div className="
          flex justify-center
          mt-[144px] md:mt-[214px]
        ">
          <div className="
            w-[360px] md:w-[536px] 
            h-[444px] md:h-[508px] 
            bg-white rounded-t-[24px] md:rounded-[48px] 
            px-5 md:px-0
            pt-6 md:pt-[56px]
            flex flex-col items-center
            shadow-[0_4px_16px_0_rgba(0,0,0,0.08),0_0_16px_0_rgba(0,0,0,0.08)]
          ">
            <h1 className="
              w-[222px] md:w-[306px] 
              h-9 md:h-11 
              text-[32px] md:text-[44px] 
              font-semibold leading-9 md:leading-[44px] 
              text-center text-[#1D2023]
            ">
              Регистрация
            </h1>

            <div className="
              w-[320px] md:w-[400px] 
              flex-1 flex flex-col 
              mt-6 md:mt-8
            ">
              {step === 1 ? (
                <>
                  <div className="w-full">
                    <Input
                      label="Корпоративный e-mail"
                      type="email"
                      placeholder="Введи логин"
                      value={email}
                      onChange={handleEmailChange}
                      error={errors.email}
                    />
                  </div>

                  <div className="h-2 md:h-2" />

                  <div className="w-full">
                    <Checkbox checked={agree} onChange={setAgree} />
                  </div>

                  <div className="h-2 md:h-2" />

                  <div className="w-full flex flex-col gap-3">
                    <Button
                      variant="primary"
                      onClick={() => setStep(2)}
                      disabled={!email || !validateEmail(email) || !agree || !!errors.email}
                    >
                      ПРОДОЛЖИТЬ
                    </Button>
                    <Button variant="gray">ВОЙТИ</Button>
                  </div>

                  <div className="h-2 md:h-2" />

                  <div className="w-full flex justify-center">
                    <HelpLink />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <Input
                      label="Имя"
                      placeholder="Введи имя"
                      value={name}
                      onChange={handleNameChange}
                      error={errors.name}
                    />
                  </div>

                  <div className="h-2 md:h-3" />

                  <div className="w-full">
                    <Input
                      label="Пароль"
                      type="password"
                      placeholder="Введи пароль"
                      value={password}
                      onChange={handlePasswordChange}
                      error={errors.password}
                    />
                  </div>

                  <div className="h-2 md:h-3" />

                  <div className="w-full flex flex-col gap-3">
                    <Button
                      variant="primary"
                      onClick={async () => {
                        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
                        try {
                          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, name, password }),
                          });
                          
                          if (response.ok) {
                            window.location.href = '/users';
                          } else {
                            const error = await response.json();
                            alert(error.message || 'Ошибка регистрации');
                          }
                        } catch (error) {
                          console.error('Ошибка регистрации:', error);
                          alert('Ошибка соединения с сервером');
                        }
                      }}
                      disabled={!name || !password || !validatePassword(password) || !!errors.name || !!errors.password}
                    >
                      ЗАРЕГИСТРИРОВАТЬСЯ
                    </Button>
                    <Button variant="gray">ВОЙТИ</Button>
                  </div>

                  <div className="h-2 md:h-2" />

                  <div className="w-full flex justify-center">
                    <HelpLink />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}