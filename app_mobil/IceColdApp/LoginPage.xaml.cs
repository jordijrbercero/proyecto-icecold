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

    private async void OnRegisterClicked(object sender, EventArgs e)
    {
        
        await Shell.Current.GoToAsync(nameof(RegisterPage));
    }
}