const startMS = performance.now();
// ------------------------------------------------------------ //

const testDisplayData = [
	{
		input: 'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb',
		output: 'fdgacbe cefdb cefbgd gcbe'
	},
	{
		input: 'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec',
		output: 'fcgedb cgb dgebacf gc'
	},
	{
		input: 'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef',
		output: 'cg cg fdcagb cbg'
	},
	{
		input: 'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega',
		output: 'efabcd cedba gadfec cb'
	},
	{
		input: 'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga',
		output: 'gecf egdcabf bgf bfgea'
	},
	{
		input: 'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf',
		output: 'gebdcfa ecba ca fadegcb'
	},
	{
		input: 'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf',
		output: 'cefg dcbef fcge gbcadfe'
	},
	{
		input: 'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd',
		output: 'ed bcgafe cdgba cbgef'
	},
	{
		input: 'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg',
		output: 'gbdfcae bgc cg cgb'
	},
	{
		input: 'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc',
		output: 'fgae cfgab fg bagce'
	}
];

const displayData = [
	{ input: 'bgafcde gfcd agc ebdgac adfceb bafeg efgca cgdfae cg ecadf', output: 'fabgced gc agc cdfg' },
	{ input: 'gbdacfe gcabfd cdb dcfba bfacg cgad fadeb feabcg cd gcbfed', output: 'bdagcef dcb cdag gbfca' },
	{ input: 'dgcbafe dbfca fbaed be cedb gefad dcfeab facdgb eba gbface', output: 'eb gadfcbe cfbad gfbeca' },
	{ input: 'ebc cb aedbf agcef badecg gaebfc bcgf adbcfge ceabf daecgf', output: 'cb bce efdab ecbaf' },
	{ input: 'fedbc cebad gfcbd fec gcdfab ecbfga dacgbfe gfed fe gefbdc', output: 'bfecag cef egdf fgde' },
	{ input: 'bafedc baefg dbfga daegcb gae egbcfa eg cefab fgce decbafg', output: 'abdgf cgfe cedgba befga' },
	{ input: 'dcba fagbed cgbfed dgfbeac da dag acbgde fcaeg becgd acgde', output: 'agd bacd dga gbecad' },
	{ input: 'ec aebgcfd fecd bagfec efagd edfgab cgdfea dgcab ecdga eac', output: 'ce ec ce gbacefd' },
	{ input: 'aegdbfc fe dacbf aefbgd aecgb cdfe ebadcf ecbfa cbfdga aef', output: 'dfce fe fcde afebdgc' },
	{ input: 'bgaf gcbad cagdfb gb dfbeca degfcb bfadc cfgeadb bdg agcde', output: 'fdegacb acbefgd bdg gafb' },
	{ input: 'gdecba dcae ec dbfeag bgead dgbce gec cgefab dcbgefa cdbfg', output: 'afdbgce agbfde abcgefd ec' },
	{ input: 'gacbefd fgbedc egafdc adf fcbae afedb ad bfeadg adbg dfgeb', output: 'ad degcfa ad dfbge' },
	{ input: 'fadebc baef eadfcg ebgdc eda cfgabd afbdc ea edcab cdgbefa', output: 'aefb ead ea ebaf' },
	{ input: 'badgecf caefd aebfdc fecbdg fadcg fed de ebad abgecf bceaf', output: 'ed gcfebd aebd gfdca' },
	{ input: 'bcdae aefcbg fgdea bf cdabegf adcebf fcbd fbead afb begadc', output: 'gbcafe faegbc fba eabdc' },
	{ input: 'bfcdeg ecd eabgc adeg ed dbaec bcfad ecabfg dbgcfea dbacge', output: 'de bdfcaeg ecgfbd bcdea' },
	{ input: 'deacf bf eagfdb gfecadb facbeg bfa cbdage abfce fbcg gecab', output: 'aebcf ecfagb abegfd bgeac' },
	{ input: 'eag dgbecf gdfae caed dfebgca ea ebcgfa dfbag gecfda dgcfe', output: 'ae ea deac fcdega' },
	{ input: 'edbga egdabc cgfdbe gabfe efcdgab gbdefa fb abdf fbg gecfa', output: 'cgaebd cbgdea acgfe begdca' },
	{ input: 'cgfedb egbdc agcfd cdagb eabgdf ab abce adb agcebfd dabegc', output: 'ba bda abd deagfb' },
	{ input: 'fc agfbce fdebg dgafeb ebfdc cbf cfedgba fdcg gcefdb eacdb', output: 'gbfaec fgcbed gbceafd bedagf' },
	{ input: 'bdcgefa acdfbe ed gbcea cfgbad ecbda edfcag afcbd ead bdef', output: 'dfbe de dea dea' },
	{ input: 'gfbeca gcefdb fegacd cgbda fbde ed bgedc begcf agdcefb ced', output: 'gbacd ced dec bcegfd' },
	{ input: 'dgbacf gfabec agd egdaf badcegf ad ecgaf defgb cade dfegca', output: 'cdae dga bgcaef ad' },
	{ input: 'dcf cfadb bcagd afebd fbgdec egfcbda fcea gfeabd fc ebdfac', output: 'gabdc ebfad aefc eacbdf' },
	{ input: 'cfgdba fcdab cgfbade adeb afdebc egcfdb de aedfc cfage edf', output: 'ed eadb dgebcf cefdabg' },
	{ input: 'bcae befga dgebfc fbagce cbefg agb fcedgab ba bdgacf dgfae', output: 'beca dcaegbf gab geafb' },
	{ input: 'dgafbec fedba cbega aebfdc eabfdg bdgfce edc fdac cd adceb', output: 'abedf dfeabg dc gdbefc' },
	{ input: 'adegfbc gbedcf cfabd gacedb abcfe fdbacg dgabc df dfga bfd', output: 'fdag dbf dafg fd' },
	{ input: 'dfbcag ebfcad ed agecdb bfacd egbfa badfe afbcegd aed cdef', output: 'afebd ecdf cfed eadfbgc' },
	{ input: 'fca dbcaf ebdcf fadbg cdbefa adec ac dacbgfe fbcdge cgefba', output: 'ac edca edac ca' },
	{ input: 'agdfce cedbfag agc dcbaeg gc bcdga bgdfa cfaebd ebdac cbge', output: 'ceadb becg ebadc gc' },
	{ input: 'aefbc aecdg efgcad cdebag bcg agfdbc bceag bdge bg fecdgab', output: 'bgecda bcdaeg gb caebf' },
	{ input: 'cfgebd acedf ag gbad gcfbad acg bgecfa bdfcg gbadecf cdfga', output: 'dgba dgcbf gac bgfdc' },
	{ input: 'cdgbafe cdgbe gd agde bcaged dfebc geacb cdg bgeacf gbdcfa', output: 'efgcba edag gecfdba cgd' },
	{ input: 'bcg bcaf cegdaf dfacg dgacb fgcebda bgdcaf efbcgd bc gadbe', output: 'gcb bcg caebdfg cfab' },
	{ input: 'eg cdgfae aecfd fgbaedc gbdfc facdeb cfegd ceag efg efdgab', output: 'fge acefbgd egf efg' },
	{ input: 'fcdg gefda cf edabc cedgfa cfa acefd cfebadg gdbafe bgecfa', output: 'fc fca cfabged fca' },
	{ input: 'ed bcadegf egdfb fgcdb edbafg facbeg abegf deba fadgec dge', output: 'eadb ged eadb adfegb' },
	{ input: 'bgedc cf cefadg ecbgdf gbfae cbdf fcg ecbgad abfgced becfg', output: 'bdcf dbceg fgcbde cdbeg' },
	{ input: 'cg gcaf defcag cdefg gdafe dgfabe gec dabegfc bcegad ebdcf', output: 'feadg degcf gcaf dcgefa' },
	{ input: 'fdeac gdcebf daecbg bgfec fdeagbc gca gecfa aefcbg fbag ag', output: 'ga decfagb ag agfb' },
	{ input: 'bc fbdc bagecdf gfdcab acdgb dcaeg dbgfa cgbaef ebgfda gbc', output: 'bdfc cb cfbd fbcd' },
	{ input: 'efagc bafegd abecg eab eb fgbeca gbedcfa bfec fcgade cgbad', output: 'abfgdce degacf fcaebg cdabfeg' },
	{ input: 'egbfcd afde ecgab fac fa edabcf cbdagfe afbec cfabgd fdebc', output: 'deaf feda cgbdfa fa' },
	{ input: 'gbafd defca ebcf eb cefbad dcebag dcgfae edfab deb bgedcfa', output: 'be deb gdbafce be' },
	{ input: 'afdgceb cf gbdeaf acdbfe abcef acf deafb fedgac cdbf cgeba', output: 'fac cfdb bdfcae fdcb' },
	{ input: 'cfdba ca afbgd eabc cda afbcdeg cfedb ecfgbd efcgad bcfeda', output: 'bfgad abec abce caeb' },
	{ input: 'cfebad debfacg acgfeb cab fedcb afcdb cdae febcdg ac dgbaf', output: 'bac ca faecbgd cgbfae' },
	{ input: 'eg dfcegb dge abedcgf facdg bafdgc degacf dafeg agec adebf', output: 'egd fegda fedbcag eagdf' },
	{ input: 'age gcbad feacb cgbdfae ge gfbe agebc fcadeg cbafde cgebaf', output: 'fagecdb bfeg baecg fceabd' },
	{ input: 'bfcdge fgcbead ebdgac ba dagbfe gab dabc bcegd gface cebga', output: 'cbda gbedc egcbafd gab' },
	{ input: 'dbcegfa fadceg fcage bcage gb bdagfc abdec gbfe bgafce bcg', output: 'ebfdagc ebfg ebgf egfb' },
	{ input: 'gcdefa bagf dgebf bdefc bgcafde dbefga edabg gfe gf dcgeba', output: 'fg efg agfb gebfd' },
	{ input: 'fabdc gdeabf dag gbace adcgb gd eagfcb gaedbc egdfabc egdc', output: 'adgbc bcadf gd cedfabg' },
	{ input: 'deagcf ce dfcaeb gfadceb bgade cde daegc cgdafb gadcf efcg', output: 'dbaecf fdecbga ce ecd' },
	{ input: 'dfcbag abceg db dgcefa dabec bcegdaf cdb bdef defac cfbdea', output: 'gdafec dcb febd bdef' },
	{ input: 'ead fgceabd edgcaf da fgda fgcea ecdgb cgaed fdbace cbagef', output: 'ad eafcdb bfecagd ad' },
	{ input: 'ab caefg agbcef efacb gecdfba ecfagd fbdec bdecga cba fgab', output: 'eafgc abfg cdagbfe dcageb' },
	{ input: 'afbcge ebafcgd dacegb cfbea afbg agc egcfa ag cgdfe bdceaf', output: 'adfbceg fagb gfba aecgbf' },
	{ input: 'acg cdegbf ecfadg cgdab fcbadg cdbgfae ca agedb cbgdf facb', output: 'cdeabfg ca afbc dagfec' },
	{ input: 'dca dbfae bagdcf aceg ac afdegc cegfd fcedgb cbdaegf cedfa', output: 'dac acge cedgf cfdbgae' },
	{ input: 'gdcafe ega cgbfde cgba afdbe bacegd ga begdc dcebagf edgab', output: 'abgc ga bacg bdacge' },
	{ input: 'begfda gdafce fg gdbf gbaced agf decagbf aebdg gabfe cebfa', output: 'fag acdbeg agcdfe dgbefca' },
	{ input: 'gfcdbea fecab cbadge afgce gc fgdace fdcg cga eagdf eagbfd', output: 'efgacbd gc dgfc dacbeg' },
	{ input: 'gdbefc feadg dbagef afd abde gebfd cefga bdgafc da efdacbg', output: 'cbegfda adf bade cdgfbe' },
	{ input: 'aefbdgc eabcfg cgefa degbf cedfg cd cadg cde fgecad fecadb', output: 'dbfegca egcdabf gcda dc' },
	{ input: 'baed bcgda abdegc decag ega dgbfaec gacbfe ae cgfde dbacgf', output: 'aebd age ea bgdecfa' },
	{ input: 'abecg faegcd egfcd efcga cdaf baedgf efa fcbaedg fcgedb fa', output: 'afe af aef fa' },
	{ input: 'abgfce cbedgaf fbedc eacdfb dcf fd faegcd fecba dfba gdceb', output: 'faecdg gdceb dfc gcbde' },
	{ input: 'fgce fgadb egdabc edg defbg eg bfced fdbace bdfgeac gbcfde', output: 'gdcbfea deg afbedc dgcaeb' },
	{ input: 'eg dgcfe efdgab bfdec aecg acbegfd bdcafg adcfg efg daefgc', output: 'fge aecg gfe ecagfdb' },
	{ input: 'acdfe bedcfg abgec cfeabd aedbfcg fecdag fg fcg afecg gdaf', output: 'cdaefg fdag cgf gadcfbe' },
	{ input: 'aedc gbdac cbagfe bfdcg gdbfea acb cbgaed ac eadgb gecadfb', output: 'gbfdc gbdaec fbgeadc decabg' },
	{ input: 'gbc afgdb cfbdga badgef gadbce egabcdf geacf bcdf cb gabfc', output: 'fgaec fcagdeb gbcfa bc' },
	{ input: 'cfgabd cfdbe eafgdc badcfeg dgfab cbag eafbdg gc dfgbc cdg', output: 'fagecd cgd afdbge cg' },
	{ input: 'eadcbf fcag gc gbc gadcefb gebad febdgc egcbaf ecbag bacef', output: 'dgbfec egadcbf gcfa bcegfda' },
	{ input: 'acbeg acgedb eg dgbfce cdagb cgdbaf gaed bafce cfebadg ecg', output: 'dbgac eabcf eabfdgc eagd' },
	{ input: 'bgefda eacg abdcfe eabcd abegcd ebg cbedg cbfdg dgfecab eg', output: 'ecag eg ge afebcd' },
	{ input: 'dgecbf bg dfcba abge gadebc edagc bcg ecdfga fbgecad bgcad', output: 'cgb gbea ebgcdf gbae' },
	{ input: 'dcabg gdfbca debc aed ed fabeg afdecg gbeda caegbd agbfcde', output: 'fcbdgea cedb dea efcdagb' },
	{ input: 'edbcafg cgaed gc gbdc acfebd cge gceabd abecd afegd bgafce', output: 'gc facegbd edbcaf cg' },
	{ input: 'gadbce gbdaf acebgf bd abcgfd edfga cdfb gbd cfgab dgafbce', output: 'gfdab fdegbac eabcfdg bgcdae' },
	{ input: 'eacgf fb cegbdf dgbfca cfb dfba agfcb cgabd ebcdgfa gedacb', output: 'acbdg dbaf ceafg bf' },
	{ input: 'gebac egdacf fdceg daef af gfa dagfbc fcgbead afgce cebfgd', output: 'afg bcage gcdeabf cgfea' },
	{ input: 'cdabfg fgbec gcdafe ceafgb egc ec beac febdg bdegcfa fabcg', output: 'cafegdb beca ecgbfa bace' },
	{ input: 'gda feabdg ebgaf bgdfc bgfcae bfeagdc edab ad adgbf fceagd', output: 'gad ad afgbde dfaebg' },
	{ input: 'bfc bgfced edbfag fcea cf afgbdce cgbda abgef fcgba aebcfg', output: 'bcf efac eacf fc' },
	{ input: 'bdeag bgdcf ec ebgdfac gcbde gaec dec cafdeb afdebg cebdag', output: 'gcbfd agedb acfdbe ecd' },
	{ input: 'befad gd edgbf bcgafd cebgfd abgcef gfd ecgd cgdfaeb ecfgb', output: 'cegd cdeg efadbgc egcdbaf' },
	{ input: 'gfdbae bc cegbfd gadcf cdaefgb gfbed fbcgd beagcd gbc becf', output: 'gedcfba edcagb fbcgdae cfbe' },
	{ input: 'ecf cbdaf bdfcaeg fagdec efba bcdfe bfecda gcedb ef cbadgf', output: 'ef fbedc dbceg edgfcab' },
	{ input: 'cabde ae ecfdba cbdfe faed dabcg cfbgaed gbfcea begdcf abe', output: 'adfe aeb cabgd ae' },
	{ input: 'gefcabd ecabd gebafc ag ecfgbd gacdbf dfcbg fdga cagbd acg', output: 'gebcadf gefbac dgaf dagf' },
	{ input: 'bgde efcgd cebgfa dbacgf cgfeb gdc fdaec dfbceg gd fegcadb', output: 'efbcadg cgd gbdcfa facebg' },
	{ input: 'gefcbd bgfdcea fg dcbag fbgcd fgeb defcag fcg becfad dfcbe', output: 'cefbda cfg fegbdc fg' },
	{ input: 'bcfed bcfdge aedbfg fad decbfa facge cdba efdca ad dbfagce', output: 'eabfgd fadce begfdca gecdbaf' },
	{ input: 'edfgbca dbega fdb gfecab fd ebcfda cfda feabd becfa edgbfc', output: 'df ebgad cabegfd adcf' },
	{ input: 'daegbc fbacg edfg befdac efbcd edafbgc cdg bcgfd fdegcb gd', output: 'dg becdf dbeafcg gadefcb' },
	{ input: 'egdacf gde ed dfebcag acgdfb cfadg agebdf cgeab gecda dfce', output: 'fedagc gabfecd eadgfbc cfgebda' },
	{ input: 'dfcea afbde fdgac gefbac eabcdf ace bced ec ebagfd adgbcfe', output: 'ce fcdga baecfg cea' },
	{ input: 'adebg gdfcae gb acegd abg begc bdaef bfgcda dgaefbc abgdec', output: 'bg cbafgd ecbg gba' },
	{ input: 'bfacde egfadcb cb fcdea eacbf cedb dcgeaf bgadfc abc ebgfa', output: 'adfebc dceb bdcafe efdac' },
	{ input: 'faegbd dgfce dcgafe fgadecb bcgd bcfge bfaec gb cdbfeg fgb', output: 'aecfb fbg fcgade dafgbec' },
	{ input: 'fgacbe fc ebcadg agfdb fdbca cagbdfe cdfe abcde fcb bfacde', output: 'cabed cfde bfdac dgbaf' },
	{ input: 'defabc gfcbe fea bdacfg adgecf fabce ae aebd bfecdga cdafb', output: 'fea ea bgfaced bead' },
	{ input: 'dfgae dcafe dce dgebfca abfcd ecab bfcdea gcfebd gafcbd ec', output: 'bcdagf cde gbedcfa bfdace' },
	{ input: 'cea gaedfb acdf ac ebacgd gefdabc befda cfbae egcfb efcabd', output: 'gcaebfd cbaef dfac ca' },
	{ input: 'gebac befadgc bedcgf cgb gc eagbdc cebaf cadg bgfaed aegdb', output: 'cbg cbg cbgadef acdg' },
	{ input: 'gfcdeb bfdegca beac befda bcf dcfga fbcda cb adecfb gbefda', output: 'fbc dbafc cbf cfb' },
	{ input: 'cbdfeag becagf acgeb be cgbda gfcdbe efba acfeg ecb eadgcf', output: 'aebf eb bagcfe eb' },
	{ input: 'febg aecbdg fedacb ecg ge fbgaedc dfgce afcgd fcbed efcdgb', output: 'aedcbg baegcfd ecg bedcf' },
	{ input: 'bcfedg gdbcae febd fcbag fgbcd bd ecdgfa dbc fdcagbe gdcfe', output: 'efgbadc fcbedg abfecgd cgbedf' },
	{ input: 'feagc cb dcgeabf fadbgc cgfdae fbdea feagcb bcafe cbeg bac', output: 'bgce bc cgadbf cba' },
	{ input: 'efagbd dageb dcgbeaf gc acg gdecab gecd fdbca gbcfea acbgd', output: 'eagbd egfabcd gfbace gca' },
	{ input: 'ae cgae dea eacgfd fadgc gfebd afdcbe dfeag acbfgd dacbgef', output: 'dgbafc cbdfgae ae ead' },
	{ input: 'egb gcfe abcfdeg begfcd abcdfg dabec eg bdfcg edgcb bedagf', output: 'bdecg beg gbdcef dbeac' },
	{ input: 'fcgae dfcebag aefdb geacbf cda dagbcf cd adcfe fedacg gdce', output: 'bcdafg adefb fdeba gecbfa' },
	{ input: 'afegd gadfb fcgadeb gbcade gdabef cefgad dfbe bdg fagbc bd', output: 'dabegc bfgca bd dgb' },
	{ input: 'dfceba faecd bd afbedgc ebad fcadb bafgc dcb efgdcb gfaedc', output: 'faedc bead egcdbaf bd' },
	{ input: 'cgb bdcfeg cg gdbeca cgef gdbcfea febdg fdcgb dafgeb bacfd', output: 'cgfe cgb gc gfec' },
	{ input: 'cadgfb cefdbag cg begacf dfgbea bgc adgbf bgcad fdgc eabcd', output: 'cg fgceab ebdacgf ecbdgaf' },
	{ input: 'bgdefc decfg cfedga cefgb bfdcea edgfacb bgcd fegba ceb cb', output: 'cfgbe dcaefg cbgfe dbcg' },
	{ input: 'gefbda acde gcbaf cd cfd bdcgfae daefg gdcbfe cgefad agdcf', output: 'gcebafd efgcda cfd aecd' },
	{ input: 'gedfc cead egbfda fgcdabe de fcgea gfdbc deg cagdef gebacf', output: 'deg bfgead gdfbc gde' },
	{ input: 'fbgae bfecg dbcaef gdcaeb cbfdge gbc decgbfa edbfc fdgc gc', output: 'gc gbcdef fdcg gfcbe' },
	{ input: 'fc caf cadbe dgabfc gebdfa fecg fagbe cebaf acbegdf cgabfe', output: 'egcf ceagbf gcfe ebgafc' },
	{ input: 'abfcd cgbfa bcgafd gadefc abfde cdf dc agfbced cbegfa gcbd', output: 'cd cfd fgeacd cdf' },
	{ input: 'bdgae gfbce cbagfd gedbcaf ebcgd gbcefa dc fcde cegdfb dbc', output: 'dcegb fgdcbea deabcfg bdc' },
	{ input: 'ebcagf df bgcdefa fdceba cgdf dbacgf eadbg afd abgcf gabfd', output: 'ceagdbf dagcbf fd dcfbaeg' },
	{ input: 'dga cadbgef efbcgd bgdca eacd cedbga gdbec gdeabf fbacg da', output: 'dag adg edac edgcb' },
	{ input: 'febcg gbadce aedbcf acbed cbgae cag gadb degbcfa ga fcgdae', output: 'bgad abdgfec acbed acg' },
	{ input: 'gdcaf dcbfag gdefa abcdg bcfg cf fedgacb dbaegc fcedba afc', output: 'cf afc gcfb eafdgbc' },
	{ input: 'gdcaef gcabfd bcefgda cde gcdfb gbecfd ec dfaeb cefbd egbc', output: 'egbfdc ce gbdcfa afbcgd' },
	{ input: 'fdea fga fa adcgbef abfcge gbeda fagdb abedgc cgbdf bdefag', output: 'fa gaecfb beadgc cbfgd' },
	{ input: 'ba gcbafd decgba bfga fbadc bda dfbeacg ecfgbd cedfa fdbgc', output: 'gfab gbdfc adb ba' },
	{ input: 'bd ecdgab aedfg bde fbcae decfba cgafbe fdeab dbfc fdgceba', output: 'db dbe cdfb bdgfaec' },
	{ input: 'bd gcefbd ebcd dafbgc ebfgd decgaf edcfg fbd fbaeg gafcdbe', output: 'cbeagdf cebd cedb cedb' },
	{ input: 'edagf cdaefbg ead efgdb bgafed cfdag bfea dabgce dfbceg ae', output: 'gcafd feab dgfca feba' },
	{ input: 'gecfda bgcdf ba abd edgabf bcdeaf gedfa fdbga baeg abegcdf', output: 'ab bad bda fgebcda' },
	{ input: 'egadb bec dbefga cbafg cageb ce ebdgca dceg gdebfca cfbead', output: 'ec ebc egdc ecb' },
	{ input: 'cbgfe fadcbg agde cbdge egdacb degcabf bed faebdc ed dcabg', output: 'eadg facdbe bcdeg debfac' },
	{ input: 'fabe fb bgf edcgaf bgacd bcfegd fcdegab adgef afbdg gbfade', output: 'bfg dbcgfae edacbgf bf' },
	{ input: 'bcdfe becgd cbafegd decag geb dgfb bfcade dgcefb bg gfbaec', output: 'bdgce gb dcbge gdfb' },
	{ input: 'egcadf bfg fgbdac faedg ebaf gcedb begdf fb adfebg cafdgeb', output: 'faedbcg bafcgde bf becgd' },
	{ input: 'edafgb ecbgd gcdfaeb ef gbfadc cgfade gef fdegc fgcda efca', output: 'agfecdb dcabgef ef dgcaf' },
	{ input: 'cbdgea fegcad bagdc abdfgc age gebac afbcdge egbfc adeb ea', output: 'ae ega ecagbd gbacd' },
	{ input: 'ecdfb edafbc fe afdcb efc degcb aedf acbgfd ecgfab fecabdg', output: 'fe dbegcaf fe cedgfba' },
	{ input: 'edbfgc caeb ca cbdafg bcdge bgcdae edfga eacgd gca cgabfed', output: 'facebdg ca aedbgc ac' },
	{ input: 'gfeba aegc cbfega ea bea dfgbe edfacgb fadgbc gbafc aefcdb', output: 'gbecfda bcdfag gcea afcegdb' },
	{ input: 'fgcea dc egfdba cdafe gfdecb fbaedc ebdfa dacb bdafgec dec', output: 'ced bcfdaeg cefda fagcbed' },
	{ input: 'dbefa defacg agd dcbfg bdfagce ga efgbdc abgc fdgab bacfdg', output: 'cbga dga gedcfab fdabcg' },
	{ input: 'eacbf eac dfagbce cfga fbgea ca bfced agebdc fbedga fcbega', output: 'dabfgce gfca ebfacg gbaecf' },
	{ input: 'cfagb cgfdea gdc agfcbe fdeacbg bcfdg dg badg fdgacb bcdef', output: 'cgd gfacb gd gdba' },
	{ input: 'cfga gbadef decabfg cbged baefcd ca cda dbagf fdbcag dbgca', output: 'afgebdc bdgeaf gafc cfag' },
	{ input: 'cgfbd cdafgb gbcead dbg afdb bgecf adfcg ecbgdfa bd gdacfe', output: 'fgacd cgdfa bdaf dbg' },
	{ input: 'abf fb febd dbafg febcga gbead egdacb fedgba fbagdce gdcaf', output: 'bf fb dbceafg fba' },
	{ input: 'fd dgfabe ecafdg deabcg cbefa fed dbgea bdefa bgdf dbfgeca', output: 'fde bdfg fdgb gfeabcd' },
	{ input: 'fgeadb abfed dgfbcea bafgd agcfd gfb bdfaec bg dgbe cegbaf', output: 'egdb fegadbc dcgaf bg' },
	{ input: 'fdabc acfbgde dg fcage cdfgab dfebag dga gdafc cdgb eafbcd', output: 'gfcad aegdcbf dag afbdc' },
	{ input: 'dbfe efdag fgdcae cgbfaed bgfead acebg fb bgf egabf abfcdg', output: 'ebdf gfb ebfd fgabed' },
	{ input: 'bafegd egcfadb fbc bc fcebgd becaf afbed agecf beacfd bdca', output: 'cb dbca cfb afgbcde' },
	{ input: 'gbefdc bfead gfcdab gbedca fc cabegdf bedfc fdc cefg cgbde', output: 'fdbceg cgfe fc bdcaefg' },
	{ input: 'fg dbfea fedagbc cageb aecfdg dfgb dbfaec gafbed begaf gaf', output: 'gfecad dgcfea dafeb gfbd' },
	{ input: 'dabfg eb egacdfb bfcdga faedc gdeb fbagec aeb bgefad dfeba', output: 'bafdcg gfbda gebd be' },
	{ input: 'adb dgeabc bfdg gaecfd afdgc cbdgfa bd dcgeafb dafbc bafce', output: 'bd fcagbde defagcb dbfg' },
	{ input: 'fge bagcf dfaebg fgebc eg cdeg fabcedg bedcf dfcegb acfbde', output: 'egcd ecgd cebafd cgdaefb' },
	{ input: 'bafdgc gecabf caegf ae beaf gfacb decgf cfedbag aec cdabeg', output: 'dcfge ae egcdafb eca' },
	{ input: 'fcgba ebgaf agefd agcdfb beac gdbcfe beg bcdfgae gacfbe eb', output: 'cfebgd abecdgf ceab abcfdge' },
	{ input: 'abcgfd bac feabd adcgeb fcgb bc debgcfa fbdac gceafd fagdc', output: 'fbcg gcfad afbed cfbda' },
	{ input: 'afdbegc dea abegd agecbd afbgdc dgbfe cabgd afcbed ceag ae', output: 'daecbfg cdbag acge ea' },
	{ input: 'ebdcg cbfg cdgebf bge adbec eabgdf baecfdg fgadce gedfc bg', output: 'dcbae fbcg beg gfbc' },
	{ input: 'cfbga cefabg ebfca abeg ae bcedfga gbacfd eac bdefc dcafge', output: 'abge fedbc bacgf eac' },
	{ input: 'eb aedcg dbfcge cegdbaf gfbe bed dagcbf dacebf dcfgb dbceg', output: 'gbef dbe fegb eb' },
	{ input: 'cgfe ced dgeba ce cegad abedcf cdaefg cfagbd cadfg gbcedaf', output: 'ecgad gcabefd dfbcgae ce' },
	{ input: 'dbagc afdc dgfaeb bcfage gbedfac cafbdg cdgeb ac cab gdafb', output: 'cab dafbcg dacf acdgfeb' },
	{ input: 'dgbae bfa eafgb bafegd fgaec bcfadg fb dbfe egbadc gbecadf', output: 'cdegbfa dagfcbe fdeb fab' },
	{ input: 'be aecgdf gbdacef bagfc bdef beagf beg dbefag gedfa cbgade', output: 'be eb afegb beg' },
	{ input: 'cfdagb ac gcfdae cbad bfgda bcfedga begcf afc ebafdg cfbga', output: 'deagcf abdc ca cagfb' },
	{ input: 'eg efdbga adbcfg ebfcga aefgd bdfga adcbgef defac gbed gae', output: 'edbg gedb bfdeag dbcgaf' },
	{ input: 'bacegf gbfca cfa ceab gafeb ca gcfdb gadfec dbafge gbdfaec', output: 'caf fbgedac fca afc' },
	{ input: 'fbagde cbeg afecg gdaecbf fedcga gab efacbg gb acbfg cfdba', output: 'gba ecbg agb abgcf' },
	{ input: 'abfg dafcgb gcafd bdcgaef ab cba ebdcf bgdaec cfaegd fcbda', output: 'acb ecadbg cgdabe fgab' },
	{ input: 'agcbd cegdba feagb fd daf gbfad bacdfg cgdfabe dcefab fgcd', output: 'df dagbc fgcd fd' },
	{ input: 'gdfeabc bcd debaf cb gedfab bcefd edfgc bdceaf aecb cdgbfa', output: 'ebac beac cbea abce' },
	{ input: 'cbgdef eg beg dbgfc bfgcead gbefd efcg edgbca eabfd acbfdg', output: 'gbe gbe cefg gbe' },
	{ input: 'fedg begcad gdb bafdge gd egbcaf gdbaf bfacd eacgdbf eafgb', output: 'cbefag baegf gefcdab bedgac' },
	{ input: 'gbce dcafgb agfdceb efdac acg agcfe aefgb befagd cegfab gc', output: 'fbedgac abdefg cga cag' },
	{ input: 'gabc bceadf agfcd agd ag fcdgbea gabdef gedfc dbcfa agbfdc', output: 'gacb gad bgceadf cbgafde' },
	{ input: 'afedc fabced gfcbed feb cegdbaf dbfa ebfac dacfeg fb gbace', output: 'feb afdb ebf acfde' },
	{ input: 'cbed edgcf ecabdfg ceg cfbgd abgfdc gebfdc ec efbagc gedfa', output: 'ec decb ecdb gec' },
	{ input: 'egd gfbeac gedcb de dabgfe dcfbg cbefdag eadc dcegba acegb', output: 'ed adgfceb gde abcged' },
	{ input: 'efadcgb fbdce fagedc agebfd gbafe abedf da bgad ead ceagbf', output: 'efagb ecdbf ade aebcgfd' },
	{ input: 'cgeb bfaed cbedga cbaed bc bca afgcbd dgface bgfecda decga', output: 'fgadcb bca dabfe cab' },
	{ input: 'dgaec deagcf egf cdeabg abgdf gdfceab dfcbeg gfead efac ef', output: 'agebcd efdbcag aefc bgefcad' },
	{ input: 'fbeac gebcaf efa fgce bgfdea dgbcfae gcbdea adcbf ef egacb', output: 'gebfacd bfadcge ef eagbc' },
	{ input: 'acdbgfe adfg edfcbg efacb egacf gca dgaceb egdcf ga gefcda', output: 'fdga cfgae cga ga' },
	{ input: 'dfebcg gdaebf dagcf gbaecd dcgebfa bf cfbe bgf bgdce fdbgc', output: 'cgbefd bcfe gbf ecbf' },
	{ input: 'dcafeg ca acf fcdeb abcfdge facdgb bfagd dfaegb bagc dfbac', output: 'dfabgce dfaegc gbafde bacg' },
	{ input: 'cgefb cbe cfab afdbeg cb faebg gcfde cefbag ebadgc afdbgec', output: 'egbdcfa cbe cafb fecagbd' }
];

function countUniqueValuesInDisplayDataOutput(displayData) {
	let countOfUniqueValues = 0;

	for (let line of displayData) {
		let outputValues = line.output.split(' ');
		for (let value of outputValues) {
			let valueLength = value.length;
			if (valueLength == 2 || valueLength == 4 || valueLength == 3 || valueLength == 7) {
				countOfUniqueValues += 1;
			}
		}
	}
	return countOfUniqueValues;
}

// console.log(countUniqueValuesInDisplayDataOutput(testDisplayData));
console.log(countUniqueValuesInDisplayDataOutput(displayData));

// for (let i = 0; i < 10000; i++) {
// countUniqueValuesInDisplayDataOutput(displayData);
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

console.log('==============================\n');
