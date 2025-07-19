# Налаштування Google Tag Manager для Podos

## 🎯 Що відстежується

### 1. Форми (form_submit)

- **Коли**: Відправлення контактної форми
- **Дані**: `form_type`, `success`, `timestamp`

### 2. Контакти (contact_click)

- **Коли**: Клік на телефон/email в хедері
- **Дані**: `contact_type` (phone/email), `contact_value`

### 3. Соціальні мережі (social_click)

- **Коли**: Клік на Facebook/Instagram/Google Maps
- **Дані**: `social_platform`, `social_url`

### 4. Навігація (navigation_click)

- **Коли**: Клік по меню (готово для майбутнього використання)
- **Дані**: `section`, `source`

### 5. Мова (language_change)

- **Коли**: Зміна мови сайту (готово для майбутнього використання)
- **Дані**: `from_language`, `to_language`

## ⚙️ Налаштування в GTM

### Крок 1: Створити змінні (Variables)

Іди до **Variables** → **User-Defined Variables** → **New**:

1. **Event Name**
   - Тип: Data Layer Variable
   - Data Layer Variable Name: `event`

2. **Form Type**
   - Тип: Data Layer Variable
   - Data Layer Variable Name: `form_type`

3. **Form Success**
   - Тип: Data Layer Variable
   - Data Layer Variable Name: `success`

4. **Contact Type**
   - Тип: Data Layer Variable
   - Data Layer Variable Name: `contact_type`

5. **Social Platform**
   - Тип: Data Layer Variable
   - Data Layer Variable Name: `social_platform`

### Крок 2: Створити тригери (Triggers)

Іди до **Triggers** → **New**:

1. **Form Submit Trigger**
   - Тип: Custom Event
   - Event name: `form_submit`
   - This trigger fires on: All Custom Events

2. **Contact Click Trigger**
   - Тип: Custom Event
   - Event name: `contact_click`
   - This trigger fires on: All Custom Events

3. **Social Click Trigger**
   - Тип: Custom Event
   - Event name: `social_click`
   - This trigger fires on: All Custom Events

### Крок 3: Створити теги (Tags)

Іди до **Tags** → **New**:

1. **GA4 - Form Submit**
   - Тип: Google Analytics: GA4 Event
   - Configuration Tag: [твій GA4 config tag]
   - Event Name: `form_submit`
   - Event Parameters:
     - `form_type`: `{{Form Type}}`
     - `success`: `{{Form Success}}`
   - Triggering: Form Submit Trigger

2. **GA4 - Contact Click**
   - Тип: Google Analytics: GA4 Event
   - Configuration Tag: [твій GA4 config tag]
   - Event Name: `contact_click`
   - Event Parameters:
     - `contact_type`: `{{Contact Type}}`
   - Triggering: Contact Click Trigger

3. **GA4 - Social Click**
   - Тип: Google Analytics: GA4 Event
   - Configuration Tag: [твій GA4 config tag]
   - Event Name: `social_click`
   - Event Parameters:
     - `social_platform`: `{{Social Platform}}`
   - Triggering: Social Click Trigger

### Крок 4: Тестування

1. Використай **Preview** режим в GTM
2. Перейди на свій сайт
3. Протестуй:
   - Відправлення форми
   - Клік на телефон/email
   - Клік на соціальні мережі
4. Перевір що події з'являються в GTM Debug

### Крок 5: Публікація

1. Збережи всі зміни
2. Натисни **Submit**
3. Додай версію та опис
4. Опублікуй зміни

## 📊 Звіти в Google Analytics

Після налаштування ти зможеш бачити:

### У розділі Events:

- `form_submit` - скільки форм відправлено
- `contact_click` - кліки на контакти
- `social_click` - кліки на соціальні мережі

### Створи Custom Reports:

1. **Form Analytics**: форми по успішності
2. **Contact Performance**: найпопулярніші способи зв'язку
3. **Social Media Traffic**: ефективність соціальних мереж

## 🔍 Приклади запитів для аналізу

```
// Скільки форм відправлено успішно цього місяця
Events → form_submit → filter: success = true

// Який контакт найпопулярніший
Events → contact_click → group by: contact_type

// Звідки приходить найбільше трафіку з соціальних мереж
Events → social_click → group by: social_platform
```

## ✅ Готово!

Тепер у тебе повноцінна аналітика яка відстежує:

- 📈 **Перегляди сторінок** (автоматично)
- 📝 **Відправлення форм** (успішні та невдалі)
- 📞 **Кліки на контакти** (телефон, email)
- 📱 **Соціальні мережі** (Facebook, Instagram, Google Maps)
