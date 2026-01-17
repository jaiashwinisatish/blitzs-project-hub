import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-destructive">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Unauthorized</h2>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
