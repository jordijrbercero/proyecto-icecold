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
        await Shell.Current.GoToAsync(nameof(ServiciosPage));
    }

    private async void OnAnalizaClicked(object sender, EventArgs e)
    {
        string urlfacial = "https://face-id-barber.vercel.app/";

        try
        {
            Uri uri = new Uri(urlfacial);
            await Launcher.Default.OpenAsync(uri);
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", "No se pudo abrir la página web.", "OK");
        }
    }

    private async void OnWebClicked(object sender, EventArgs e)
    {
        string urlweb = "https://ice-cold-web.vercel.app/";

        try
        {
            Uri uri = new Uri(urlweb);
            await Launcher.Default.OpenAsync(uri);
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", "No se pudo abrir la página web.", "OK");
        }
    }

    private async void OnConocenosClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(ConocenosPage));
    }

    private async void OnContactarClicked(object sender, EventArgs e)
    {
        await DisplayAlert("Contacto", "Mostrando información de contacto", "OK");
    }

    protected override void OnAppearing()
    {
        base.OnAppearing();

        if (SesionGlobal.UsuarioActual != null && !string.IsNullOrEmpty(SesionGlobal.UsuarioActual.FotoPerfilBase64))
        {
            byte[] bytesImagen = Convert.FromBase64String(SesionGlobal.UsuarioActual.FotoPerfilBase64);
            BotonPerfil.Source = ImageSource.FromStream(() => new MemoryStream(bytesImagen));

           
            BotonPerfil.Aspect = Aspect.AspectFill;
        }
        else
        {
            BotonPerfil.Source = "ic_usuario.png";

            
            BotonPerfil.Aspect = Aspect.AspectFit;
        }
    }
    

    private async void OnPerfilClicked(object sender, EventArgs e)
    {
        if (SesionGlobal.UsuarioActual == null)

            await Shell.Current.GoToAsync(nameof(LoginPage));
        else

            await Shell.Current.GoToAsync(nameof(PerfilPage));
    }
}


