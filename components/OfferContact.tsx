import { useRef } from 'react';
import Title from './Title';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';

type Props = {};

const OfferContract: React.FC<Props> = (props: Props) => {
	const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    bodyClass: 'print-page',
  });
  return (
    <div className="lg:w-[1000px] md:w-[650px] w-[358px] h-[900px] overflow-auto  bg-white p-12  text-xl flex  flex-col text-justify">
      <div ref={contentRef}>
        <div className=" text-center">
          {' '}
          <Title type="h1" color="dark">
            Договір оферти (надання послуг)
          </Title>
        </div>
        <p className=" mt-8 ">
          <span className="font-semibold">
            Товариство з обмеженою відповідальністю «ІННОВАЦІЙНІ МЕДІА РІШЕННЯ»{' '}
          </span>{' '}
          (код ЄДРПОУ 37723560) (далі - Виконавець) керуючись статтями 633, 641 Цивільного кодексу
          України, пропонують необмеженому колу фізичних осіб, укласти цей Договір (далі - Договір)
          на нижчевикладених умовах:
        </p>
        <h2 className="my-4 font-semibold text-xl text-center">1. Визначення термінів</h2>
        <p>У цьому Договорі нижченаведені терміни матимуть такі значення:</p>
        <p>
          <span className="pl-10 ">
            1.1. <span className=" font-semibold">Оператор</span>{' '}
          </span>{' '}
          - юридична особа, що надає послуги рухомого радіотелефонного зв&apos;язку, Абоненти яких
          отримують SMS-повідомлення в порядку і на умовах, визначених цим Договором.
        </p>
        <p>
          <span className="pl-10 ">
            1.2. <span className=" font-semibold">Абонент</span>{' '}
          </span>{' '}
          - фізична або юридична особа, що користується послугами рухомого радіотелефонного
          зв&apos;язку одного з Операторів.
        </p>
        <p>
          <span className="pl-10 ">
            1.3. <span className=" font-semibold">Користувач</span>{' '}
          </span>{' '}
          - споживач телекомунікаційних послуг будь-якого Оператора зв&apos;язку, який надав свою
          згоду на отримання SMS-повідомлень від Замовника.
        </p>
        <p>
          <span className="pl-10 ">
            1.4. <span className=" font-semibold">СМС</span>{' '}
          </span>{' '}
          - вартість одного SMS-повідомлення, яку Виконавець поповнює в особистий кабінет Замовника
          після оплати такої вартості Замовником на рахунок Виконавця. Одна СМС у грошовому
          еквіваленті дорівнює одному SMS-повідомленню.
        </p>
        <p>
          <span className="pl-10 ">
            1.5. <span className=" font-semibold">SMS-повідомлення</span>{' '}
          </span>{' '}
          - сукупність текстових та цифрових знаків (текст), що формується Замовником та передається
          Користувачам. Кількість текстових та цифрових знаків в одному SMS-повідомленні не може
          перевищувати 160 латиницею або 70 кирилицею. Якщо довжина тексту перевищує зазначену вище
          кількість символів, то кожна подальша складова частина SMS-повідомлення тарифікується як
          окреме SMS- повідомлення. У випадку, якщо текст одного SMS-повідомлення вміщує одночасно
          знаки і латиниці і кирилиці, вважається що таке SMS-повідомлення відправлене кирилицею.
          Згідно специфікації кодування GSM 03.38 є символи, які вважаються як два символи, а саме:
          ~ ^ [ ] {} \ |).
        </p>
        <p>
          <span className="pl-10 ">
            1.6. <span className=" font-semibold">Мобільний номер</span>{' '}
          </span>{' '}
          - номер формату +38ХХХХХХХХХХ, на який можливий прийом SMS-повідомлень від Абонентів, і з
          якого можлива відправка SMS-повідомлень Абонентам.
        </p>
        <p>
          <span className="pl-10 ">
            1.7. <span className=" font-semibold">Логін</span>{' '}
          </span>{' '}
          - ім&apos;я , яке Замовник формує при реєстрації на сайті Виконавця.{' '}
        </p>
        <p>
          <span className="pl-10 ">
            1.8. <span className=" font-semibold">Альфанумеричне Ім’я </span>{' '}
          </span>{' '}
          - ім&apos;я Відправника (не більше 11 символів - кількість знаків обмежена протоколом
          GSM), яке складається з латинських букв та / або цифр, що присвоюється Замовником при
          відправці SMS- повідомлень.
        </p>
        <p>
          <span className="pl-10 ">
            1.9.{' '}
            <span className=" font-semibold">Система або SMSC (Short Message Service Centre)</span>{' '}
          </span>{' '}
          - програмно-апаратний комплекс Виконавця, який дозволяє Замовнику обробляти та відправляти
          SMS-повідомлення.
        </p>
        <p>
          <span className="pl-10 ">
            1.10 <span className=" font-semibold"></span> .SME (Short Message Entry)
          </span>{' '}
          - зовнішній апаратно-програмний додаток Замовника, що забезпечує прийом, обробку та
          відправку SMS-повідомлень Абонентам, що взаємодіє з SMSC Виконавця по зовнішнім протоколам
          прийому-передачі: SMPP, SMTP, РОР3, HTTP, HTTPS, розроблений на підставі технічної
          документації, що надається Виконавцем.
        </p>
        <p>
          <span className="pl-10 ">
            1.11 <span className=" font-semibold"></span> .WEB-інтерфейс
          </span>{' '}
          - віртуальний особистий кабінет Замовника, розташований на серверах Виконавця, доступ до
          якого здійснюється після реєстрації та авторизації (введення логіна і пароля), і в межах
          якого Сторони цього Договору обмінюються юридично і технічно значущою інформацією, що
          стосується виконання цього Договору (в тому числі тарифи на послуги, статистика по
          відправленим повідомленнями).
        </p>
        <p>
          <span className="pl-10 ">
            1.12 <span className=" font-semibold"></span> .Трафік
          </span>{' '}
          - кількість вхідних і вихідних SMS-повідомлень за Звітний період дії цього Договору.
        </p>
        <p>
          <span className="pl-10 ">
            1.13 <span className=" font-semibold"></span> .Звітний період
          </span>{' '}
          - календарний місяць, протягом якого Замовнику надавались послуги за цим Договором.
        </p>
        <p>
          <span className="pl-10 ">
            1.14 <span className=" font-semibold"></span> .Номер телефонної лінії сервісного
            обслуговування
          </span>{' '}
          – номер телефону Замовника або представника від Замовника, що забезпечує сервісну
          підтримку Користувачів щодо розсилки SMS-повідомлень в рамках цього Договору, зокрема:
          консультування, прийняття скарг, надання згоди чи/та заборони на отримання SMS-
          повідомлень від Замовника та ін.
        </p>
        <p>
          <span className="pl-10 ">
            1.15 <span className=" font-semibold"></span> .Електронний рахунок
          </span>{' '}
          - технологічний засіб обліку в Системі Виконавця грошових зобов&apos;язань по наданим
          Замовникові послуг.
        </p>
        <p>
          <span className="pl-10 ">
            1.16 <span className=" font-semibold"></span> .Мінусовій рахунок
          </span>{' '}
          - негативна різниця між фактичною сумою оплачених Замовником послуг за цим Договором і
          тарифною вартістю фактично використаного Замовником Трафіку. Розмір мінусового рахунку в
          WEB-інтерфейсі визнається безумовним грошовим зобов&apos;язанням Замовника перед
          Виконавцем (кредиторською заборгованістю Замовника).
        </p>
        <p>
          <span className="pl-10 ">
            1.17. <span className=" font-semibold"></span>Контактний e-mail
          </span>{' '}
          - це електронна адреса, що вказується Замовником в особистому кабінеті, та
          використовується для отримання Замовником інформаційних та рекламних повідомлень від
          адміністрації сайту.
        </p>
        <p>
          <span className="pl-10 ">
            1.18 <span className=" font-semibold"></span> .Сайт
          </span>{' '}
          - це сайт, розміщений в мережі інтернет за адресою: bsender.com.ua, який Виконавець
          використовує на законних правах для надання Послуг.
        </p>
        <p>
          {' '}
          <span className="pl-10 ">
            1.19 <span className=" font-semibold"></span> .СПАМ-повідомлення
          </span>{' '}
          - це:
        </p>
        <p className="pl-8">
          • SMS-повідомлення, на отримання якого Користувач попередньо не дав згоду;
        </p>
        <p className="pl-8">
          • SMS-повідомлення з однаковим або різним текстом, яке доставляється одному й тому ж
          Користувачеві більш ніж 10 (десять) разів на добу;
        </p>
        <p className="pl-8">
          • SMS-повідомлення яке призвело до скарги Користувача або виникнення перешкод технічного
          характеру в роботі обладнання Виконавця або телекомунікаційної мережі Оператора;
        </p>
        <p className="pl-8">
          • SMS-повідомлення яке не містить достовірну інформацію про назву Замовника та Номер
          телефонної лінії сервісного обслуговування;
        </p>
        <p className="pl-8">
          • SMS-повідомлення, подальше отримання якого Користувач не може припинити шляхом
          інформування про це Замовника;
        </p>
        <p className="pl-8">
          • SMS-повідомлення за отримання якого з Користувача буде стягнуто оплату, за умови, що
          Користувач не замовляв такого SMS-повідомлення;
        </p>
        <p className="pl-8">
          • SMS-повідомлення, текст яких не був попередньо погоджений з Виконавцем, у разі, якщо
          таке узгодження тексту Виконавцем є обов&apos;язковим згідно умов цього Договору;
        </p>
        <p className="pl-8">
          • SMS-повідомлення яке доставляється Користувачеві, заохочуючи його зателефонувати та/або
          відправити текстове повідомлення на запропоновані номери, або прийняти участь у будь-яких
          заходах, або містять пропозиції підключитися до мережі Оператора, Абоненти якого отримують
          SMS-повідомлення;
        </p>
        <p className="pl-8">
          • SMS-повідомлення, зміст якого суперечить чинному законодавству України;
        </p>
        <p className="pl-8">
          • SMS-повідомлення яке містить інформацію, що може бути розцінена як передвиборна агітація
          та/ або політична реклама;
        </p>
        <p className="pl-8">
          • SMS-повідомлення яке містить інформацію еротичного та/чи порнографічного характеру;
        </p>
        <p className="pl-8">• SMS-повідомлення яке містить інформацію релігійного характеру.</p>
        <h2 className="my-4 font-semibold text-xl text-center">2. Предмет Договору</h2>
        <p>
          2.1. Виконавець надає Замовнику наступні послуги: Передача SMS, wap-push повідомлень від
          Замовника до Абонентів за допомогою Системи Виконавця
        </p>
        <p>
          2.2. Фактом надання Послуги за цим Договором є проходження SMS-повідомлення, сформованого
          і відправленого Замовником, через систему Виконавця.
        </p>
        <h2 className="my-4 font-semibold text-xl text-center">
          3. Права та обов&apos;язки Замовника
        </h2>
        <p>
          3.1. Замовник зобов&apos;язується:
          <span>
            3.1.1. Здійснювати розсилку SMS-повідомлень, використовуючи Систему Виконавця Абонентам.
          </span>
          <span>
            3.1.2. Здійснювати відправку SMS-повідомлень тільки тим Користувачам, які надали свою
            згоду на отримання SMS-повідомлень від Замовника. Замовник протягом 2 (двох) робочих
            днів з моменту отримання відповідного запиту від Виконавця повинен надати письмове
            підтвердження того, що Користувач належним чином дав згоду на отримання SMS-повідомлень
            від Замовника.
          </span>
          <span>
            3.1.3. Негайно припинити відправку SMS-повідомлень якщо Користувач, що її отримує
            будь-яким засобом повідомив Замовника про свою заборону чи відмову на надіслання
            SMS-повідомлень, переданих в рамках цього Договору.
          </span>
          <span>
            3.1.4. Власником бази даних телефонних номерів користувачів є Замовник. В разі
            пред&aos;явлення Користувачами скарг / претензій / позовів до Виконавця або Оператору
            щодо отриманих SMS-повідомлень, відповідальність за такі скарги / претензії / позови
            несе Замовник.
          </span>
          <span>
            3.1.5. Реєструвати ім&apos;я відправника через WEB-інтерфейс. В момент реєстрації
            Виконавець перевіряє ім&apos;я, запрошуване Замовником і активує його у Оператора
            Зв&apos;язку.
          </span>
          <span>3.1.6. Присвоювати всім відправленим SMS-повідомленнями ім&apos;я відправника. </span>
          <span>
            3.1.7. У разі, якщо Виконавець буде втягнутий в судовий процес в якості відповідача у
            зв&apos;язку з наданням Користувачу /-ам в SMS-повідомленнях недостовірної,
            конфіденційної інформації, інформацію, яка була отримана Замовником на незаконних
            підставах або інформації, яка порушує права третіх осіб, або поширення якої заборонено
            чинним законодавством, Виконавець буде визнаний не належним відповідачем. Належним
            відповідачем у цьому випадку повинен бути визнаний Замовник. Замовник несе
            відповідальність згідно чинного законодавства України.
          </span>
          <span>
            3.1.8. У разі аварії або відключення устаткування чи каналів зв&apos;язку Виконавця
            слідувати вказівкам Виконавця з обмеження пропускної здатності з&apos;єднання свого
            обладнання з Системою Виконавця з метою запобігання її перевантажень.
          </span>
          <span>
            3.1.9. Своєчасно оплачувати послуги Виконавця в розмірі та на умовах, передбачених цим
            Договором.
          </span>
          <span>
            3.1.10. Надсилати SMS-повідомлення лише у період з 09:00 до 20:00 у робочі дні та з
            11:00 до 18:00 у неробочі та святкові дні (дане обмеження не застосовується при
            відправленні повідомлень про підтвердження банківських операцій, реєстрацію на сайті,
            повідомлень від служб таксі та інші цілодобові сервісні повідомлення, попередньо
            погоджені Замовником з Виконавцем.)
          </span>
        </p>
        <p>
          3.2. Замовник не має права:
          <span>
            3.2.1. Реєструвати ім&apos;я відправника, яке може вплинути на репутацію сторонніх осіб
            і організацій. Наприклад, назва компанії, до якої Замовник не має ніякого відношення,
            або номер телефону, який не належить Замовнику.
          </span>
          <span>
            3.2.2. Відправляти через Систему Виконавця SMS-повідомлення, які будуть відповідати
            ознакам СПАМ- повідомлень, Повідомлення образливого чи наклепницького характеру, що
            розпалюють національну, расову чи релігійну ворожнечу
          </span>
        </p>

        <h2 className="my-4 font-semibold text-xl text-center">
          4. Права та обов&apos;язки Виконавця
        </h2>
        <p>
          4.1. Виконавець зобов&apos;язується:
          <span>
            4.1.1. Надати Замовнику доступ до WEB-інтерфейсу Системи, а також встановити Замовникові
            тарифні плани на надання послуг,
          </span>
          <span>
            4.1.2. Забезпечувати безперебійну роботу SMSC протягом строку дії цього Договору, за
            винятком випадків виникнення проблем з електроживленням, пожежею, терористичним актом,
            та іншими обставинами непереборної сили, які підтверджуються відповідною довідкою
            уповноважених органів державної влади.
          </span>
          <span> 4.1.3. Надавати Замовнику послуги.</span>
          <span>
            4.1.4. Негайно інформувати Замовника про появу в Системі Виконавця SMS-повідомлень,
            зазначених в п.3.2.2. і блокувати такі SMS-повідомлення, при наявності технічної
            можливості.
          </span>
          <span>
            4.1.5. Вести облік наданих послуг за підсумками кожного звітного періоду і відображати
            ці дані на сторінці статистики WEB- інтерфейсу.
          </span>
          <span>
            4.1.6. Реєструвати ім&aos;я відправника в перебігу 3 (трьох) робочих днів з моменту
            подачі заявки через WEB- інтерфейс при наявності технічної можливості.
          </span>
        </p>
        <p>
          4.2. Виконавець має право:
          <span>
            4.2.1. Відключати доступ Замовника до Системи при проведенні профілактичних робіт. При
            цьому Виконавець зобов&apos;язується повідомити Замовника про заплановані профілактичні
            роботи не менш ніж за 3 (три) календарних дні до дати відключення шляхом повідомлення на
            сайті. Час проведення профілактичних робіт має становити не більше 5 (п&apos;яти) годин
            за раз.
          </span>
          <span>
            4.2.2. Змінити в односторонньому порядку діючі тарифи шляхом повідомлення на сайті
            Замовника не пізніше 10 (десяти) календарних днів до початку дії нових тарифів. Якщо
            Замовник продовжує відправляти повідомлення з моменту вступу в силу нових тарифів, це
            визнається згодою Замовника на зміну тарифів. Припинення користування Замовником
            послугами за цим Договором з моменту вступу в силу нових тарифів визнається відмовою
            Замовника від змінених тарифів, після чого Виконавець має право вважати Договір
            припиненим.
          </span>
          <span>
            4.2.3. Відмовити у зверненні будь-якій особі (Замовнику) у реєстрації імені відправника,
            так само як і в укладенні Договору, у разі вичерпання технічної можливості Виконавця в
            наданні даних послуг на момент звернення.
          </span>
          <span>
            4.2.4. Заблокувати (в тому числі на певний час) можливість роботи в SMSC Замовнику, якщо
            той буде оперувати SMS-повідомленнями, які відповідають ознакам СПАМ-повідомлень,
            SMS-повідомленнями образливого чи наклепницького характеру, що розпалюють національну,
            расову чи релігійну ворожнечу.
          </span>
          <span>
            4.2.5. Призупинити обробку SMS-повідомлень при нульовому або мінусовому залишку на
            Електронному рахунку Замовника.
          </span>
        </p>

        <h2 className="my-4 font-semibold text-xl text-center">5. Порядок розрахунків</h2>

        <p> 5.1. Замовник оплачує послуги Виконавця відповідно до тарифів.</p>
        <p>
          5.2. Мінімальний платіж за послуги Виконавця складає 199,00 грн. (сто дев’яносто дев’ять),
          при цьому всі невикористані СМС не мають строку дії і можуть бути використані Замовником
          через будь-який час.
        </p>
        <p>
          5.3. Оплата послуг здійснюється Замовником на умовах попередньої оплати, шляхом
          перерахування грошових коштів на розрахунковий рахунок Виконавця, Виконавець поповнює СМС
          у власний кабінет Замовника після зарахування грошових коштів на розрахунковий рахунок
          Виконавця.
        </p>
        <p> 5.4. Оплата за всі послуги Виконавця здійснюється в гривнях.</p>

        <h2 className="my-4 font-semibold text-xl text-center">6. Відповідальність Сторін</h2>
        <p>
          6.1. Сторони несуть відповідальність за невиконання або неналежне виконання
          зобов&apos;язань за цим Договором відповідно до чинного законодавства України.
        </p>
        <p>
          6.2. Відповідальність за зберігання пароля і недоступність пароля до WEB-інтерфейсу третім
          особам несе Замовник. Виконавець не несе відповідальності перед Замовником за будь-які
          збитки, понесені Замовником у зв&apos;язку із втратою пароля, або доступністю пароля
          третім особам.
        </p>
        <p>
          6.3. Виконавець не надає Замовнику гарантій своєчасного проходження всіх без винятку
          SMS-повідомлень та не несе відповідальності за такого роду випадки, в разі, якщо доставка
          (або несвоєчасна доставка) не відбулися з причин, не залежних від Виконавця, наприклад,
          технічні неполадки на стороні Операторів зв&apos;язку, перебої з електроживленням і т.д.
        </p>
        <p>
          6.4. Виконавець не несе відповідальності у разі направлення Замовником SMS-повідомлень з
          помилковим кодуванням, якщо це спричинило сегментування SMS-повідомлень та їх повторну або
          багаторазову оплату.
        </p>
        <p>
          6.5. Відповідальність за зміст відправлених Замовником SMS-повідомлень несе сам Замовник.
          В рамках цього Договору Виконавець забезпечує проходження SMS-повідомлень в їх незмінному
          змісті та обсязі, без будь- якого тлумачення, редагування або цензурування, в зв&apos;язку
          з цим відповідальність за включення до SMS- повідомлення відомостей і даних, що суперечать
          чинному законодавству (в тому числі висловлювання екстремістського характеру, ненормативна
          лексика, розкриття відомостей, що містять військову, державну та іншу охоронювану законом
          таємницю, і т.п.), покладається на Замовника.
        </p>
        <p>
          6.6. Відповідальність за претензії і позови, пов&apos;язані з порушенням Замовником
          встановленого порядку використання Мобільних номерів (у тому числі Номери відправника),
          несе Замовник.
        </p>
        <p>
          6.7. Замовник несе відповідальність щодо будь-яких, пов&apos;язаних з SMS-повідомленнями,
          отриманих Виконавцем в рамках цього Договору і тих, що виникли у зв&apos;язку з порушенням
          його умов, претензій чи вимог виплати компенсацій на користь Операторів, а також
          Абонентів, транзитних мереж, провайдерів і будь-яких інших третіх осіб, що мали відношення
          до прийому, обробки та передачі SMS-повідомлень, переданих через SMSC Виконавця від
          Замовника. Положення цього пункту діє також щодо власників авторського права і будь- яких
          організацій і приватних осіб, чиї права могли бути порушені в результаті передачі
          SMS-повідомлень, переданих через SMSC Виконавця від Замовника. Про вказані у цьому пункті
          претензії та вимоги Виконавець зобов’язаний повідомляти Замовника протягом 1 (одного)
          робочого дня з моменту їх отримання.
        </p>
        <p>
          6.8. Виконавець має право припинити надання послуг згідно п.2.1. з подальшим розірванням
          Договору в наступних випадках:
          <span>
            6.8.1. Якщо програмні засоби Замовника некоректно працюють з SMSC Виконавця і наносять
            будь-яким чином шкідливі дії;
          </span>
          <span>
            6.8.2. При отриманні інформації від Оператора зв&aos;язку або від одержувачів
            SMS-повідомлень про наявність СПАМ-повідомлень. В цьому випадку Виконавець має право
            призупинити виконання цього Договору в односторонньому порядку до надання Замовником
            відомостей, що підтверджують, що дані SMS-повідомлення не є СПАМ-повідомленнями.
          </span>
          <span>
            6.8.3. При отриманні інформації від Оператора зв&aos;язку або від одержувачів
            SMS-повідомлень про наявність в них заборонених до передачі відомостей;
          </span>
        </p>
        <p>
          6.9. Розірвання Договору не звільняє жодну зі Сторін від сплати штрафів та винесених
          штрафних санкцій
        </p>
        <h2 className="my-4 font-semibold text-xl text-center">7. Прикінцеві положення</h2>
        <p>
          7.1. Виконавець залишає за собою право без попереднього повідомлення Замовника вносити
          зміни в тарифну політику з подальшою публікацією нових тарифів на Сайті. Такі зміни
          набувають чинності після закінчення 5 (п&apos;яти) робочих днів з моменту розміщення нових
          тарифів на Сайті. При незгоді Замовника із внесеними змінами він зобов&apos;язаний
          відмовитися від доступу до Сайту, припинити використання матеріалів і сервісів Сайту.
        </p>
        <p>
          7.2. У випадку зміни номеру телефону Виконавця повідомити про це Замовника протягом 3
          (трьох) робочих днів
        </p>
        <p>
          7.3. У разі зміни з боку Замовника Основного засобу зв’язку він зобов’язується повідомити
          Виконавця протягом 3 (трьох) робочих днів. Зміна відбувається за запитом Замовника з
          Реєстраційного e-mail, та/або в письмовому запиті з наданням документів, що підтверджують
          особу Замовника.
        </p>
        <p>
          7.4. Усі запити щодо облікового запису приймаються лише з Основних засобів зв’язку
          Замовника. Надання додаткової інформації щодо облікового запису надаються лише на
          Реєстраційний e-mail.
        </p>
        <p>
          7.5. У випадку передачі Замовником даних для доступу до облікового запису третім особам на
          будь-яких умовах (у тому числі за договорами або угодами) Замовник самостійно несе
          відповідальність за всі дії (а також їх наслідки) в рамках або з використанням Сервісу під
          обліковим записом Замовника. При цьому всі дії в рамках або з використанням Сервісу під
          обліковим записом Замовника вважаються зроблені безпосередньо Замовником.
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrint}
          className={`block mt-2 text-emailColorLink hover:opacity-80 focus:opacity-80`}
        >
          Роздрукувати Договір оферти
        </button>
      </div>
    </div>
  );
};

export default OfferContract;
