import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  login: z.email("Formato de e-mail inválido"),
  senha: z.string().min(5, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof schema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (e: LoginFormData) => {
    const isSuccess = await login({ login: e.login, password: e.senha });

    if (isSuccess) navigate("/dashboard");
    console.log(e);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem vindo de volta 👋</h1>
                {/* <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p> */}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="login">Email</Label>
                <Input
                  {...register("login")}
                  id="login"
                  type="email"
                  isLoading={isSubmitting}
                  placeholder="m@example.com"
                  required
                />
                {errors.login && (
                  <span className="text-sm text-destructive">
                    {errors.login.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  {...register("senha")}
                  id="password"
                  isLoading={isSubmitting}
                  type="password"
                  required
                />
                {errors.senha && (
                  <span className="text-sm text-destructive">
                    {errors.senha.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Login
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Desenvolvido por <a href="#">&copy;ZukoSoftware</a>{" "}
        {new Date().getFullYear()}{" "}
      </div>
    </div>
  );
}
