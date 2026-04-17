using Microsoft.Maui.ApplicationModel.Communication;

namespace IceColdApp;

public partial class ContactarPage : ContentPage
{
    public ContactarPage()
    {
        InitializeComponent();
    }

    // Abre la app llamadas
    private void OnTelefonoTapped(object sender, TappedEventArgs e)
    {
        // Comprueba si el dispositivo soporta llamadas
        if (PhoneDialer.Default.IsSupported)
        {
            PhoneDialer.Default.Open("+34600000000"); 
        }
    }

    // Abre nuestro perfil en instagram
    private async void OnInstagramTapped(object sender, TappedEventArgs e)
    {
        // Abre la app y si no esta el navegador
         await Launcher.Default.OpenAsync("https://instagram.com/icecoldbarberapp");
        
    }

    // Abre el corrreo 
    private async void OnCorreoTapped(object sender, TappedEventArgs e)
    {
        //El "mailto:" le dice al móvil que prepare un correo nuevo

         await Launcher.Default.OpenAsync("mailto:info@icecold.com");
        
    }
}