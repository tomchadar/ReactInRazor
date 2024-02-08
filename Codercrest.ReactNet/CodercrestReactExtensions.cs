using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using React.AspNet;

namespace Codercrest.ReactNet
{
    public static class CodercrestReactExtensions
    {
        public static IServiceCollection AddCodercrestReactForRazor(this IServiceCollection services)
        {
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName)
                .AddChakraCore();

            services.AddReact();

            return services;
        }
        public static IApplicationBuilder UseCodercrestReactForRazor(this IApplicationBuilder app, string? reactAppBuildPath = null)
        {
            if (string.IsNullOrEmpty(reactAppBuildPath))
            {
                reactAppBuildPath = "~/appdist";
            }
            // Initialise ReactJS.NET. Must be before static files.
            app.UseReact(config =>
            {
                config
                    .SetReuseJavaScriptEngines(true)
                    .SetLoadBabel(true)
                    .SetLoadReact(true)
                    .SetReactAppBuildPath("~/appdist");
            });
            return app;
        }
    }
}