import Image from "next/image"

export function RouteMap() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Маршрут экспедиции</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Уникальное путешествие через три континента и два океана
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Image
              src="/images/route-map.jpg"
              alt="Карта маршрута круиза: Cape Town - Tristan da Cunha - South Georgia - Antarctic Peninsula - Ushuaia"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-serif text-xl font-bold mb-3">Начало маршрута</h3>
              <p className="text-muted-foreground">
                <strong>Кейптаун, Южная Африка</strong> — один из красивейших мегаполисов мира с посещением мыса Доброй
                Надежды и Столовой горы
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-serif text-xl font-bold mb-3">Завершение</h3>
              <p className="text-muted-foreground">
                <strong>Ушуайя, Аргентина</strong> — самый южный город мира, ворота в Антарктиду
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
