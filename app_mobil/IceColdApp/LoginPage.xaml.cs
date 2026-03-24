namespace IceColdApp;

public partial class LoginPage : ContentPage
{
    public LoginPage()
    {
        InitializeComponent();
    }

    private void OnLoginClicked(object sender, EventArgs e)
    {
        // Aquí irá la lógica para verificar el usuario
        DisplayAlert("Aviso", "Lógica de login en construcción", "OK");
    }

    private void OnRegisterClicked(object sender, EventArgs e)
    {
        // Aquí irá la lógica para ir a una página de registro o cambiar la vista
        DisplayAlert("Aviso", "Lógica de registro en construcción", "OK");
    }
}