namespace IceColdApp;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
    }

    private async void OnReservaClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Reserva", "¡Abriendo el calendario de reservas!", "OK");
    }

    private async void OnServiciosClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Servicios", "Mostrando servicios disponibles", "OK");
    }

    private async void OnAnalizaClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Análisis", "Analizando tu corte...", "OK");
    }

    private async void OnWebClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Web", "Abriendo página web", "OK");
    }

    private async void OnConocenosClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Conócenos", "Conociendo la barbería", "OK");
    }

    private async void OnContactarClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Contacto", "Mostrando información de contacto", "OK");
    }

    private async void OnPerfilClicked(object sender, EventArgs e)
    {
        
        await Shell.Current.GoToAsync(nameof(LoginPage));
    }
}