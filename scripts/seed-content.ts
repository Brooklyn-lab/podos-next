/**
 * Seed script — repopulates CMS content after locale migration.
 * Uses Payload Local API (no auth needed).
 *
 * Usage:  npx tsx scripts/seed-content.ts
 */

import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, '..')

async function main() {
  const { default: config } = await import(path.resolve(root, 'payload.config.js'))

  const payload = await getPayload({ config })

  console.log('\n→ Seeding Certificates')
  await payload.updateGlobal({
    slug: 'certificates',
    locale: 'pl',
    data: {
      title: 'moje certyfikaty',
      description:
        'W moim gabinecie oferuję specjalistyczne i nowoczesne metody leczenia. Stosuję systemy korekcji UniBrace, nici tytanowe, które szybko pomagają w rozwiązaniu problemów wrastających i zdeformowanych paznokci. Prowadzę terapię polegającą na leczeniu brodawek, pęknięć na piętach, eliminowaniu modzeli, odcisków.',
    },
  })
  console.log('  ✓ certificates [pl]')

  await payload.updateGlobal({
    slug: 'certificates',
    locale: 'ua',
    data: {
      title: 'Мої Сертифікати',
      description:
        "В кабінеті я пропоную спеціалізовані та сучасні методи лікування. Використовую корекційні системи UniBrace, титанові ныті, які швидко допомагають в рішенні проблем врослих та деформованих нігтів. Проводжу терапії з лікування бородавок, тріщин на п'ятах, усуваю мозолі, натоптиші.",
    },
  })
  console.log('  ✓ certificates [ua]')

  console.log('\n→ Seeding Works')
  await payload.updateGlobal({
    slug: 'works',
    locale: 'pl',
    data: {
      title: 'moje prace',
      description: 'PodOS to gwarancja opieki na najwyższym poziomie. Odwiedź i dowiedz się jak mogę Ci pomóc!',
      headerParagraph1:
        'Wykonuję zabiegi z serii SPA - kąpiele parafinowe na dłonie i stopy, które mają nie tylko dobry efekt kosmetyczny dla skóry, ale także zdrowotny, fizjoterapeutyczny dla stawów. Oferuję masaż z elementami refleksologii jako odrębny rodzaj usługi, a także jako zakończenie zabiegów SPA.',
    },
  })
  console.log('  ✓ works [pl]')

  await payload.updateGlobal({
    slug: 'works',
    locale: 'ua',
    data: {
      title: 'Мої роботи',
      description: 'PodOS - це гарантія догляду на найвищому рівні. Відвідайте і дізнайтеся, як можу вам допомогти!',
      headerParagraph1:
        'Виконую процедури із серії СПА - парафінові ванни для рук і стоп, які мають не тільки добрий косметичний ефект для шкіри, але й оздоровчий, фізіотерапевтичний для суглобів. Пропоную масаж з елементами рефлексології як окремий вид послуги, так на закінчення СПА процедур.',
    },
  })
  console.log('  ✓ works [ua]')

  console.log('\n→ Seeding Settings (address)')
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'pl',
    data: {
      addressTitle: 'Adres',
      address: '53-680 Wrocław, ul. Braniborska 61/13',
      building: "(budynek Legnicka Residence, 2 piętro, Gabinet przy studii 'Pracownia fryzur')",
      additionalTitle: 'Dodatkowo:',
      additionalItems: [{ text: '- parking' }, { text: '- możliwość wjazdu osób niepełnosprawnych' }],
    },
  })
  console.log('  ✓ settings [pl]')

  await payload.updateGlobal({
    slug: 'settings',
    locale: 'ua',
    data: {
      addressTitle: 'Адреса',
      address: '53-680 Wrocław, вул. Braniborska 61/13',
      building: "(будівля Legnicka Residence, 2-й поверх, кабінет при салоні 'Pracownia fryzur')",
      additionalTitle: 'Додатково:',
      additionalItems: [{ text: '- паркінг' }, { text: "- можливість в'їзду для осіб з інвалідністю" }],
    },
  })
  console.log('  ✓ settings [ua]')

  console.log('\n→ Seeding Services')
  const existing = await payload.find({ collection: 'services', limit: 1 })

  const plItems = [
    {
      title: 'Konsultacja',
      price: '100 zł',
      duration: '30min',
      treatment: 'Diagnoza zmian w obrębie skóry i paznokci. Przedstawienie i omówienie terapii',
    },
    {
      title: 'Pedicure podologiczny',
      price: 'od 200 zł',
      duration: 'do 1h 30min',
      treatment: 'Opracowanie podeszwy stóp, skrócenie i oczyszczenie paznokci, aplikacja preparatów kosmetycznych',
    },
    {
      title: 'Pedicure podologiczny leczniczy',
      price: 'od 250 zł',
      duration: 'do 2h',
      treatment: 'Opracowanie podeszwy stóp, skrócenie i oczyszczenie paznokci, aplikacja preparatów leczniczych',
    },
    {
      title: 'Pedicure klasyczny z lakierem hybrydowym',
      price: 'od 220 zł',
      duration: 'do 1h 45min',
      treatment:
        'Opracowanie podeszwy stóp, skrócenie i oczyszczenie paznokci, naniesienie pokrycia hybrydowego, aplikacja preparatów kosmetycznych',
    },
    {
      title: 'Pedicure SPA (pedicure japoński)',
      price: 'od 220 zł',
      duration: 'do 1h 45min',
      treatment:
        'Opracowanie podeszwy stóp, skrócenie i oczyszczenie paznokci, aplikacja preparatów kosmetycznych, wykonanie pedicure metodą mechanicznego wcierania pasty specjalnej leczniczej w płytkę paznokcia i polerowanie pudrem mineralnym',
    },
    { title: 'Masaż stóp z elementami refleksologii', price: 'od 120 zł', duration: '30min', treatment: '' },
    { title: 'Kąpiele parafinowe stóp (z masażem)', price: 'od 200 zł', duration: 'do 1h 10min', treatment: '' },
    {
      title: 'Kąpiele parafinowe stóp i dłoni (z masażem)',
      price: 'od 250 zł',
      duration: 'do 2h 30min',
      treatment:
        'Opracowanie stóp i dłoni, aplikacja preparatów kosmetycznych, zanurzenie w kąpieli parafinowej, masaż',
    },
    {
      title: 'Grzybica paznokci',
      price: 'od 150 zł',
      duration: 'do 1h 30min',
      treatment: 'Diagnoza podologiczna, opracowanie i leczenie, aplikacja produkty leczniczego',
    },
    {
      title: 'Terapia brodawek wirusowych',
      price: 'od 150 zł (1 wizyta) - od 100 zł (2 wizyta)',
      duration: 'do 45min',
      treatment: 'Opracowanie brodawek, leczenie',
    },
    {
      title: 'Paznokieć wrastający',
      price: 'od 150 zł',
      duration: 'do 1h',
      treatment: 'Opracowanie wrastającej części i leczenie paznokcia',
    },
    {
      title: 'Usunięcie modzela/odcisku',
      price: 'od 100 zł',
      duration: 'do 1h',
      treatment: 'Usunięcie modzela lub odcisku oraz założenie odciązenia',
    },
    {
      title: 'Leczenie pękających pięt',
      price: 'od 150 zł',
      duration: 'do 1h 30min',
      treatment: 'Opracowanie pęknięć, aplikacja preparatów leczniczych, nałożenie bandaża',
    },
    {
      title: 'Instalacja systemu UniBrace',
      price: 'od 200 zł',
      duration: 'do 45min (1 palec)',
      treatment: 'Poprawa kształtu, zapobieganie procesu zapalnego i wrastaniu paznokcia w skórę',
    },
    {
      title: 'Klamra tytanowa',
      price: 'od 200 zł',
      duration: 'do 45min (1 palec)',
      treatment: 'Poprawa kształtu, zapobieganie procesu zapalnego i wrastaniu paznokcia w skórę',
    },
    {
      title: 'Jonoforeza w leczeniu nadpotliwości stóp i dłoni',
      price: '110 zł (Cena pakietu (10 zabiegów) - 1000 zł)',
      duration: '',
      treatment:
        'Zabieg fizjoterapeutyczny, podczas którego delikatne działanie prądu stałego pomaga zmniejszyć aktywność gruczołów potowych',
    },
  ]

  const uaItems = [
    {
      title: 'Консультація',
      price: '100 злотих',
      duration: '30хв',
      treatment:
        'Діагностика змін на шкірі і нігтях. Обговорення терапії і методів лікування. Безплатна при умові на процедуру',
    },
    {
      title: 'Педикюр подологічний',
      price: 'від 200 злотих',
      duration: 'до 1г 30хв',
      treatment: 'Очищення стоп, обрізання нігтів, нанесення препаратів косметичних',
    },
    {
      title: 'Педикюр подологічний лікувальний',
      price: 'від 250 злотих',
      duration: 'до 2г',
      treatment: 'Очищення стоп, обрізання нігтів, нанесення препаратів косметичних та лікувальних',
    },
    {
      title: 'Педикюр класичний з гібридним покриттям нігтів',
      price: 'від 220 злотих',
      duration: 'до 1г 45хв',
      treatment: 'Очищення стоп, підготування нігтів, покриття лаком гібридним, нанесення препаратів косметичних',
    },
    {
      title: 'Педикюр СПА (японський педикюр)',
      price: 'від 220 злотих',
      duration: 'до 1г 45хв',
      treatment:
        'Очищення стоп, обрізання нігтів, нанесення препаратів косметичних, виконання педикюру методом механічного втирання в нігтьову пластину спеціальної лікувальної пасти та полірування мінеральною пудрою',
    },
    { title: 'Масаж стоп з елементами рефлексології', price: 'від 120 злотих', duration: '30хв', treatment: '' },
    { title: 'Ванни парафінові для ніг (+масаж)', price: 'від 200 злотих', duration: '1г 10хв', treatment: '' },
    {
      title: 'Ванни парафінові для ніг і рук (+масаж)',
      price: 'від 250 злотих',
      duration: 'до 2г 30хв',
      treatment: 'Очищення, накладання препаратів косметичних, занурення до ванни з парафіном, масаж',
    },
    {
      title: 'Грибкове ураження нігтів',
      price: 'від 150 злотих',
      duration: 'до 1г 30хв',
      treatment: 'Діагностика подологічна, очищення нігтів, аплікація лікувальна',
    },
    {
      title: 'Терапія бородавок вірусних',
      price: 'від 150 злотих (1-й візит) - від 100 злотих (подальше лікування)',
      duration: 'до 45хв',
      treatment: 'Очищення бородавок, лікування',
    },
    {
      title: 'Врослий ніготь',
      price: 'від 150 злотих',
      duration: 'до 1г',
      treatment: 'Робота з врослою частиною і лікування нігтя',
    },
    {
      title: 'Видалення мозолів/натоптишів',
      price: 'від 100 злотих',
      duration: 'до 1г',
      treatment: 'Видалення мозолів чи натоптишів, накладання ортопедичних накладок',
    },
    {
      title: "Лікування тріщин на п'ятах",
      price: 'від 150 злотих',
      duration: 'до 1г 30хв',
      treatment: "Робота з тріщинами, аплікація з лікувальними препаратами, накладання пов'язки",
    },
    {
      title: 'Встановлення корекційної системи UniBrace',
      price: 'від 200 злотих',
      duration: 'до 45хв (1 палець)',
      treatment: 'Поліпшення форми, сприяння запобіганню процесу запалення та вростанню нігтя в шкіру',
    },
    {
      title: 'Встановлення корекційної скоби титанової',
      price: 'від 200 злотих',
      duration: 'до 45хв (1 палець)',
      treatment: 'Поліпшення форми, сприяння запобіганню процесу запалення та вростанню нігтя в шкіру',
    },
    {
      title: 'Іонофорез для лікування надмірного потовиділення ніг та рук',
      price: '110 злотих (Вартість пакету (10 процедур) - 1000 злотих)',
      duration: '',
      treatment:
        "Фізіотерапевтична процедура, під час якої м'яка дія постійного струму допомагає зменшити активність потових залоз",
    },
  ]

  let serviceId: number | string

  if (existing.docs.length > 0) {
    serviceId = existing.docs[0].id
    console.log(`  Found existing doc: ${serviceId}`)
  } else {
    const doc = await payload.create({
      collection: 'services',
      locale: 'pl',
      data: {
        title: 'Usługi i ceny w PodOS',
        description: 'W swojej pracy kieruję się przezroczystością i lojalnością cenową.',
        headerParagraph1:
          'Gabinet PodOS to miejsce komfortu, gdzie każdy zabieg jest dostosowywany do potrzeb pacjenta, pozwalając na uzyskanie optymalnych efektów.',
        headerParagraph2:
          'Dla dzieci i pacjentów w podeszłym wieku - udzielany jest stały rabat na wszystkie rodzaje usług.',
        items: plItems,
      },
    })
    serviceId = doc.id
    console.log(`  Created doc: ${serviceId}`)
  }

  // Update PL first to establish the items array
  const plDoc = await payload.update({
    collection: 'services',
    id: serviceId,
    locale: 'pl',
    data: {
      title: 'Usługi i ceny w PodOS',
      description: 'W swojej pracy kieruję się przezroczystością i lojalnością cenową.',
      headerParagraph1:
        'Gabinet PodOS to miejsce komfortu, gdzie każdy zabieg jest dostosowywany do potrzeb pacjenta, pozwalając na uzyskanie optymalnych efektów.',
      headerParagraph2:
        'Dla dzieci i pacjentów w podeszłym wieku - udzielany jest stały rabat na wszystkie rodzaje usług.',
      items: plItems,
    },
  })
  console.log('  ✓ services [pl]')

  // Re-read to get item IDs, then patch UA using the same IDs to preserve PL values
  const savedItems = plDoc.items || []
  const uaItemsWithIds = uaItems.map((item, i) => ({
    ...item,
    id: (savedItems[i] as Record<string, unknown>)?.id as string | undefined,
  }))

  await payload.update({
    collection: 'services',
    id: serviceId,
    locale: 'ua',
    data: {
      title: 'Послуги та ціни в PodOS',
      description: 'В роботі дотримуюся прозорості та лояльності в цінах.',
      headerParagraph1:
        'Кабінет PodOS – це місце комфорту, де кожна процедура адаптується до потреб пацієнта, що дозволяє досягти оптимальних результатів.',
      headerParagraph2: 'Для дітей і літніх пацієнтів - надається постійна знижка на всі види послуг.',
      items: uaItemsWithIds,
    },
  })
  console.log('  ✓ services [ua]')

  console.log('\n✅ Done! All content seeded.\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ Error:', err)
  process.exit(1)
})
