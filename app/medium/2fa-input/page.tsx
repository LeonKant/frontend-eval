import PageTemplate from "@/components/PageTemplate";
import Input2FA from "./_components/Input2FA";

const Input2FAPage = () => (
  <PageTemplate header="Two-factor code input">
    <Input2FA numInputs={5} code={"12345"} />
  </PageTemplate>
);
export default Input2FAPage;
