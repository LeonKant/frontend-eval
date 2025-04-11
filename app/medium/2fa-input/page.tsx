import PageTemplate from "@/components/PageTemplate";
import Input2FA from "./_components/Input2FA";

const Input2FAPage = () => (
  <PageTemplate header="Two-factor code input">
    <Input2FA numInputs={4} code={"1234"} />
  </PageTemplate>
);
export default Input2FAPage;
