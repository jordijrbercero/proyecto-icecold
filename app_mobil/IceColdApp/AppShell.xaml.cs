namespace IceColdApp;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        // Registra la ruta hacia la página de Login
        Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
    }
}