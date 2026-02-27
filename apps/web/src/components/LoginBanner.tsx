import LoginButton from "@/components/LoginButton";

const LoginBanner = ({
  handleLoginSuccess,
}: {
  handleLoginSuccess: () => void;
}) => {
  return (
    <div className="bg-blue-75 rounded-[1.25rem] px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <h2 className="text-subtitle-1-sb md:text-display-3 leading-tight text-gray-800">
          로그인하고 내 하루 기록을 확인해 보세요
        </h2>

        <LoginButton
          onLoginSuccess={handleLoginSuccess}
          className="w-full justify-center md:w-auto md:justify-start"
        />
      </div>
      <p className="text-body-2 md:text-heading-rg mt-2 text-gray-800">
        지금 보이는 화면은 샘플데이터에요
      </p>
    </div>
  );
};

export default LoginBanner;
