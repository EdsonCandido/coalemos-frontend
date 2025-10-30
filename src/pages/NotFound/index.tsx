import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="text-xl text-muted-foreground">Página não encontrada.</p>
      <Button>
        <Link to="/">Voltar para o início</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
