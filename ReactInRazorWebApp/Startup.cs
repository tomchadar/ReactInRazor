using Codercrest.ReactNet;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;


namespace ReactInRazorApp
{
    public class Startup
    {
        public static string FrontEnd = "FrontEnd";
        //public static string FrontEnd = "ClientApp";

        public static string ClientAppDir = "FrontEnd";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();
            IMvcBuilder servicesBuilder = services.AddRazorPages();

            services.Configure<Microsoft.AspNetCore.Routing.RouteOptions>(options =>
            {
                options.LowercaseUrls = true;
            });

#if !SPADEBUG
#if USE_REACT
            services.AddCodercrestReactForRazor();
#endif
#else
            // In production, the React files will be served from this serverDirectory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = Startup.ClientAppDir + "/build";// "ClientApp/build";
            });
#endif
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (!env.IsProduction())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();

            }
#if USE_REACT
            app.UseCodercrestReactForRazor("~/appdist");
#endif
            // app.UseHttpsRedirection();
            app.UseStaticFiles();
#if SPADEBUG
            app.UseSpaStaticFiles();
#endif
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
               
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
#if !SPADEBUG
                endpoints.MapRazorPages();
#endif

            });
#if SPADEBUG
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Startup.ClientAppDir;// "ClientApp";
                string fileProviderDir = Path.Combine(Directory.GetCurrentDirectory(), Startup.ClientAppDir, "public");

                spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(fileProviderDir)
                };


                if (env.IsDevelopment())
                {
                    //spa.Options.StartupTimeout = System.TimeSpan.FromSeconds(120);
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }

            });
#endif
        }
    }
}
