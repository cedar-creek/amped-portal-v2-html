package main

import "github.com/kataras/iris/v12"

func main() {
	app := iris.New()
	app.RegisterView(iris.HTML("./layouts", ".html").
		Layout("shared/layout.html").
		Reload(true))

	app.HandleDir("/assets", iris.Dir("./demo1/dist/assets"))

	app.Get("/", func(ctx iris.Context) {
		ctx.View("index.html") 
	})

	app.Listen(":8080")
}
