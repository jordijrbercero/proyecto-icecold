using Microsoft.Extensions.Logging;

namespace IceColdApp
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            //Crea el constructor de la app.
            var builder = MauiApp.CreateBuilder();
            builder

                //Indica cuál es la aplicación principal.
                .UseMauiApp<App>()

                //Configura las fuentes de la app.
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

#if DEBUG

            //Activa los mensajes de depuración.
    		builder.Logging.AddDebug();
#endif

            //Construye y devuleve la app.
            return builder.Build();
        }
    }
}
