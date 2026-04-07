namespace IceColdApp;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        // Registra la ruta hacia la página de Login
        Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));

        Routing.RegisterRoute(nameof(RegisterPage), typeof(RegisterPage)); 

        Routing.RegisterRoute(nameof(PerfilPage), typeof(PerfilPage));

        Routing.RegisterRoute(nameof(ServiciosPage), typeof(ServiciosPage));
    }
}