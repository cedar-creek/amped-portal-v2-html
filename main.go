package main

import (
	"math/rand"

	"github.com/kataras/iris/v12"
)

func main() {
	app := iris.New()
	app.RegisterView(iris.HTML("./layouts", ".html").
		Layout("shared/layout.html").
		Reload(true))

	app.HandleDir("/assets", iris.Dir("./demo1/dist/assets"))

	app.UseGlobal(func(ctx iris.Context) {
		ctx.ViewData("Ver", rand.Float64())
		ctx.Next()
	})

	app.Get("/", func(ctx iris.Context) {
		ctx.View("index.html")
	})

	app.Listen("ampedtest.cedarcreeksolutions.com:8083")
}
