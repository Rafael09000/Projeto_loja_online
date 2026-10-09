const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const R=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const ST={cart:JSON.parse(localStorage.getItem('rl_cart')||'[]'),coupon:0,parc:1};
const save=()=>{localStorage.setItem('rl_cart',JSON.stringify(ST.cart));$('#cnt').textContent=ST.cart.length};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)};
const COR={Preta:'#000',Verde:'#080',Bege:'#d2b48c',Vermelha:'#c00',Branca:'#fff',Marrom:'#6b3a14',Cinza:'#444',Roxo:'#509'};
const P=[
{id:1,cat:'camisetas',m:'ARMANI',n:'Camiseta Armani Preta',p:429.99,c:['Vermelha','Verde','Bege'],e:'👕'},
{id:2,cat:'camisetas',m:'RESERVA',n:'Camiseta Reserva Preta',p:259.9,c:['Bege','Preta','Verde'],e:'👕'},
{id:3,cat:'camisetas',m:'LACOSTE',n:'Camiseta Lacoste Preta',p:350,c:['Preta','Bege','Vermelha'],e:'👕'},
{id:4,cat:'camisetas',m:'CALVIN KLEIN',n:'Camiseta Calvin Preta',p:155,c:['Preta','Verde','Bege','Vermelha'],e:'👕'},
{id:5,cat:'camisetas',m:'TOMMY',n:'Camiseta Tommy Bege',p:160,c:['Preta','Bege','Verde'],e:'👕'},
{id:6,cat:'camisetas',m:'RESERVA',n:'Camiseta Reserva Branca',p:259.9,c:['Preta','Bege','Vermelha'],e:'👕'},
{id:7,cat:'camisetas',m:'LACOSTE',n:'Camiseta Lacoste Vermelha',p:350,c:['Preta','Verde','Bege','Vermelha'],e:'👕'},
{id:8,cat:'camisetas',m:'TOMMY',n:'Camiseta Tommy Cáqui',p:139.99,c:['Preta','Verde','Bege'],e:'👕'},
{id:9,cat:'polos',m:'Milano',n:'Camisa polo MILANO',d:'Linho Italiano · corte slim, forro acetinado',p:200,tag:'NOVO',c:['Preta'],e:'👔'},
{id:10,cat:'calcas-jeans',m:'Louis Vuitton',n:'Calça Jeans Louis Vuitton',d:'Jeans · corte reto, cintura alta',p:1999,tag:'SALE',c:['Cinza'],e:'👖'},
{id:11,cat:'polos',m:'Loro Piana',n:'Polo cashmere',d:'100% cashmere, acabamento artesanal',p:3190,c:['Marrom'],e:'👔'},
{id:12,cat:'calcas-sport-fino',m:'Calvin Klein',n:'Calça Sport Fino',d:'100% algodão',p:600,tag:'NOVO',c:['Preta'],e:'👖'},
{id:13,cat:'ternos',m:'Hugo Boss',n:'Terno Slim Hugo Boss',d:'Lã virgem · corte slim, forro acetinado',p:3500,tag:'TERNOS',c:['Preta'],e:'🤵'},
{id:14,cat:'relogios',m:'Rolex',n:'Relógio Rolex Explorer 40',d:'40 mm, aço Oystersteel',p:68500,de:70800,tag:'SALE',c:['Cinza'],e:'⌚'},
{id:15,cat:'bones',m:'Lacoste',n:'Boné Lacoste Gabardine',d:'100% algodão',p:429,tag:'BONÉS',c:['Preta'],e:'🧢'},
{id:16,cat:'perfumes',m:'Dior',n:'Perfume Sauvage Dior',p:1000,tag:'NOVO',c:['Preta'],e:'🧴'},
{id:17,cat:'jaquetas',m:'LOUIS VUITTON — Outerwear',n:'Jaqueta Louis Vuitton Alto Relevo',d:'Tecido em suede, com capuz',p:37050,de:39000,c:['Preta','Marrom','Cinza','Roxo'],e:'🧥'}];
const MENU={Lançamentos:[['🚀 Lançamentos','lancamentos'],['👕 Última moda','ultima-moda'],['✨ Essenciais','essenciais']],
Promoções:[['🏷️ 60% OFF','60off'],['🏷️ 30% OFF','30off'],['🏅 Mais vendidos','mais-vendidos'],['❄️ Inverno 2026','inverno'],['🔁 Compre 1, leve 2','compre1']],
Produtos:[['Camisetas','camisetas'],['Camisas','camisas'],['Polos','polos'],['Calças jeans','calcas-jeans'],['Calças sport fino','calcas-sport-fino'],['Bermudas e shorts','bermudas'],['Jaquetas','jaquetas'],['Blusas','blusas']],
Acessórios:[['🧢 Bonés','bones'],['👛 Carteiras','carteiras'],['Cintos','cintos'],['Cuecas','cuecas'],['Meias','meias'],['🧴 Perfumes','perfumes'],['⌚ Relógios','relogios']],
Alfaiataria:[['Camisas sociais','camisas-sociais'],['🤵 Ternos','ternos'],['Palitos','palitos'],['👞 Sapatos','sapatos'],['Calças Sociais','calcas-sociais'],['Suéters','sueters']]};
$('#nav').innerHTML=Object.entries(MENU).map(([k,v])=>`<div class="dd"><a href="#/">${k}</a><div class="pop"><h4>${k.toUpperCase()}</h4>${v.map(([l,s])=>`<a href="#/produtos/${s}">${l}</a>`).join('')}</div></div>`).join('')+'<div class="dd"><a href="#/marca">Nossa Marca</a></div>';

const dots=c=>`<div class="dots">${c.map(x=>`<i style="background:${COR[x]}"></i>`).join('')}</div>`;
const card=(p,full)=>`<div class="card"><div class="pic" onclick="location.hash='#/produto/${p.id}'">${p.e}</div>${p.tag?`<span class="tag ${p.tag}">${p.tag}</span>`:''}
${full?`<small style="color:#777">${p.m}</small><div class="nm">${p.n}</div>`:`<div class="nm">${p.n}</div><div class="brand">${p.m}</div><div class="ds">${p.d||''}</div>`}
<div class="pr">${p.de?`<s>${R(p.de)}</s>`:''}${R(p.p)}</div>${full?dots(p.c):''}
<div class="row">${full?`<button class="add" data-add="${p.id}">ADICIONAR</button>`:''}<a class="plus" style="text-align:center;padding:10px;${full?'':'margin-left:auto'}" data-add="${p.id}">+</a></div></div>`;

const V={
home:()=>`<h2>Destaques <a href="#/produtos/camisetas">Ver todos →</a></h2><div class="grid">${P.slice(8,16).map(p=>card(p)).join('')}</div>
<h2 style="margin-top:24px">● Peça da Semana</h2><div class="week"><div class="pic">👟</div><div><h2 style="display:block">Tênis Nike Air Force 1 Masculino</h2><p>Casual, confortável, durável e atemporal.</p><p class="red">Estoque limitado, apenas 5 unidades disponíveis</p>
<p style="margin:10px 0">R$949,99 <span class="gr">no Pix</span> <s>R$1000,00</s> <span class="gr">5% OFF</span></p><button class="btn gold" data-reserve>RESERVAR →</button></div></div>
<h2 style="margin-top:16px">● Opções de entrega</h2><div class="opts">${[['PAC Correios','8 a 12 dias úteis','R$ 24,90'],['SEDEX','3 a 5 dias úteis','R$ 48,90'],['SEDEX 1 Dia','Próximo dia útil','R$ 89,90'],['Frete Premium','Compras acima de R$600','Grátis']].map(o=>`<div class="opt"><b>${o[0]}</b><span>${o[1]}</span><span>${o[2]}</span></div>`).join('')}</div>`,
produtos:s=>{const l=P.filter(p=>p.cat===s),t=Object.values(MENU).flat().find(x=>x[1]===s);const nome=t?t[0].replace(/^[^\p{L}]+/u,'').trim():s;
return`<div class="crumb">inicio > produtos > ${s}</div><h2>${nome} <small>${l.length}+ PRODUTOS</small></h2><div class="grid">${l.map(p=>card(p,1)).join('')||'<p>Em breve novos produtos nesta categoria.</p>'}</div>`},
produto:i=>{const p=P.find(x=>x.id==i)||P[16];const pix=p.p*.95;
return`<div class="crumb">INICIO>PRODUTOS>${p.cat.toUpperCase()}>${p.n}</div><div class="detail"><div><div class="big">${p.e}<span class="tag" style="top:10px;left:10px">NOVA COLEÇÃO</span></div><div class="thumbs"><div>${p.e}</div><div>${p.e}</div><div>${p.e}</div><div>${p.e}</div></div></div>
<div><h3 style="color:var(--gold)">${p.m}</h3><h1>${p.n.toUpperCase()}</h1><p style="color:#aaa">${p.d||''}</p><p>★★★★☆ 4.8 · 43 avaliações</p><hr style="margin:10px 0;border-color:#555">
${p.de?`<div class="old">De: ${R(p.de)}</div>`:''}<div class="price">${R(p.p)}</div><p style="color:var(--gold)">— 5% no Pix: ${R(pix)}</p><p style="font-size:13px">ou 12× de ${R(p.p/12)} sem juros</p>
<p style="margin-top:10px;color:#aaa">Cor:</p>${p.c.map((c,k)=>`<span class="sw ${k?'':'on'}" data-cor="${c}" style="background:${COR[c]}"></span>`).join('')}
<p style="color:#aaa;margin-top:8px">Tamanhos:</p>${['PP','P','M','G','GG'].map((t,k)=>`<span class="sz ${k==2?'on':''}">${t}</span>`).join('')}
<div class="acc">Descrição ⌄<p>${p.n} — peça exclusiva da curadoria RL.</p></div><div class="acc">Composição ⌄<p>Conforme etiqueta do fabricante.</p></div><div class="acc">Cuidados ⌄<p>Lavar à mão, não usar alvejante.</p></div>
<p style="margin-top:10px;color:#aaa">Calcular frete:</p><div class="row"><input id="cep" placeholder="CEP: 00000-000" maxlength="9"><button class="btn" data-frete>Calcular</button></div><p id="fr"></p>
<button class="btn wide" style="background:#4cd964;color:#000;font-size:26px;margin-top:12px" data-buy="${p.id}">COMPRAR 🛒</button></div></div>`},
login:()=>`<div class="auth"><div class="tl" style="font-size:40px">♛<br>RL</div><div class="tl">ESTILO QUE IMPÕE. CONFIANÇA QUE FICA.</div><h1>LOGIN</h1><p style="font-size:13px">Entre na sua conta e aproveite o melhor da moda masculina de grife.</p>
<label>E-MAIL</label><input id="em" type="email" placeholder="✉ Digite seu e-mail"><label>SENHA</label><input id="pw" type="password" placeholder="🔒 Digite sua senha"><p style="text-align:right;margin:6px 0"><a class="lk" href="#/login" style="color:#6bbf3a;font-size:13px">Esqueceu sua senha?</a></p>
<p class="err" id="er"></p><button class="btn wide" data-login>ENTRAR</button><div class="sep">— OU —</div><button class="btn dark wide" data-g>G ENTRAR COM GOOGLE</button><p style="text-align:center;margin-top:12px;font-size:14px">Ainda não tem uma conta? <a class="lk" style="color:#6bbf3a" href="#/cadastro">Cadastre-se</a></p></div>`,
cadastro:()=>`<div class="split"><div class="l">♛RL</div><div class="r light"><h2 style="display:block">Criar conta</h2><p style="color:#777">Preencha seus dados para se cadastrar</p>
<div class="two"><div><label>NOME</label><input id="c1" placeholder="João"></div><div><label>SOBRENOME</label><input placeholder="Silva"></div></div><label>E-MAIL</label><input id="c2" type="email" placeholder="exemplo@email.com">
<label>CPF</label><input id="cpf" placeholder="000.000.000-00" maxlength="14"><div class="two"><div><label>TELEFONE</label><input id="tel" placeholder="(11) 99999-0000"></div><div><label>DATA DE NASCIMENTO</label><input type="date"></div></div>
<label>SENHA</label><input id="s1" type="password"><label>CONFIRMAR SENHA</label><input id="s2" type="password"><p style="margin:12px 0"><input type="checkbox" id="tm" style="width:auto"> Concordo com os <u>Termos de Uso</u> e a <u>Política de Privacidade</u></p><p class="err" id="er"></p>
<button class="btn dark wide" data-cad>CRIAR CONTA</button></div></div>`,
pagamento:()=>{const sub=ST.cart.reduce((a,p)=>a+p.p,0),fr=sub>=600||!sub?0:24.9,tot=Math.max(0,sub*(1-ST.coupon)+fr);
return`<div class="steps"><span><b>✓</b> CARRINHO</span>—<span><b>✓</b> ENTREGA</span>—<span class="cur"><b>3</b> <span class="gr">PAGAMENTO</span></span></div><div class="pay">
<div><div class="box"><h3>FORMA DE PAGAMENTO</h3><div class="tabs"><button class="on" data-tab>💳 CARTÃO</button><button data-tab>PIX</button><button data-tab>BOLETO</button></div><div id="cc"><label>NÚMERO DO CARTÃO</label><input placeholder="0000 0000 0000 0000" maxlength="19"><label>NOME NO CARTÃO</label><input placeholder="João A Silva"><div class="two"><div><label>VALIDADE</label><input placeholder="MM/AA" maxlength="5"></div><div><label>CVV</label><input placeholder="***" maxlength="4"></div></div></div></div>
<div class="box" style="margin-top:10px"><h3>PARCELAMENTO</h3>${[1,2,3].map(n=>`<div class="par ${n==ST.parc?'on':''}" data-par="${n}">✔ ${n}X de ${R(tot/n)} <span class="gr">sem juros</span></div>`).join('')}</div></div>
<div class="box" style="align-self:start"><h3>CUPOM DE DESCONTO</h3><input id="cp" placeholder="desconto10"><button class="btn gold wide" style="margin-top:8px" data-cupom>APLICAR</button></div>
<div><div class="box res"><h3>RESUMO DO PEDIDO</h3>${ST.cart.map(p=>`<div><span>${p.n}</span><b>${R(p.p)}</b></div>`).join('')||'<p style="color:#777">Carrinho vazio</p>'}<hr><div><span>SUBTOTAL</span><b>${R(sub)}</b></div>${ST.coupon?`<div><span>DESCONTO</span><b>-${R(sub*ST.coupon)}</b></div>`:''}<div><span>FRETE</span><b class="gr">${fr?R(fr):'GRÁTIS'}</b></div><hr><div><b>TOTAL</b><b>${R(tot)}</b></div></div>
<button class="btn dark wide" style="margin-top:12px" data-fin>🔒 FINALIZAR PEDIDO</button></div></div>`},
marca:()=>`<div class="brand-p"><h2 style="display:block;text-align:center">♛ NOSSA MARCA</h2><p>A RL Moda Masculina nasceu de uma paixão genuína: acreditar que o homem brasileiro merece se vestir com excelência, sem abrir mão de identidade e sofisticação.</p><br><p>Em apenas um ano, construímos mais do que uma loja: criamos uma comunidade de homens que entendem que estilo é atitude.</p><br><p>Cada peça do nosso acervo passou por uma curadoria rigorosa. Não vendemos roupas, oferecemos a versão mais elegante de quem você já é.</p><blockquote>"Roupa boa não é luxo. É respeito por si mesmo e por quem está ao seu lado."<br>— Fundadores da RL Moda Masculina</blockquote></div>`,
pedido:()=>{const it=[['Camisa Social Slim Fit – Azul Marinho','M','CS-4821',189.9],['Calça Chino Alfaiataria – Caqui','42','CC-7714',249.9],['Cinto Couro Genuíno – Preto','90cm','CT-1103',89.9]];
const ev=[['Pedido confirmado e pagamento aprovado','29 abr 2026 · 14h22',1],['Pedido coletado e postado nos Correios','30 abr 2026 · 09h15',1],['Objeto encaminhado ao centro de distribuição','30 abr 2026 · 18h47',1],['Em trânsito para a cidade de destino','02 mai 2026 · 07h30',1],['Saiu para entrega','Aguardando...',0],['Entregue ao destinatário','Aguardando...',0]];
return`<h2 style="display:block;text-align:center;color:#aaa">Meu Pedido<br><small>Pedido #RL-2024-00847 · realizado em 29 de abril de 2026</small></h2><div class="st"><div><small style="color:#aaa">STATUS ATUAL</small><h3>🚚 EM TRÂNSITO</h3><small>PACOTE SAIU DO CENTRO DE DISTRIBUIÇÃO DE SÃO PAULO</small></div><span class="pill" style="background:#7a6000;color:#fff">⏱ 2 DIAS RESTANTES</span></div>
<div class="two-c"><div class="box info" style="background:#000;color:#fff"><h3 style="color:#999">Dados do cliente</h3><div><span>Nome</span><b>Ricardo Almeida</b></div><div><span>CPF</span><b>***.456.789-**</b></div><div><span>E-mail</span><b>r.almeida@email.com</b></div><div><span>Telefone</span><b>(11) 99876-5432</b></div></div>
<div class="box info" style="background:#000;color:#fff"><h3 style="color:#999">Endereço de entrega</h3><div><span>Rua</span><b>Av. Paulista, 1578, apto 42</b></div><div><span>Bairro</span><b>Bela Vista</b></div><div><span>Cidade</span><b>São Paulo – SP</b></div><div><span>CEP</span><b>01310-100</b></div></div></div>
<div class="box" style="margin:14px 0"><h3 style="color:#777">Itens do pedido</h3>${it.map(i=>`<div style="display:flex;justify-content:space-between;border-bottom:3px solid #888;padding:8px 0"><div>${i[0]}<br><small>Tam. ${i[1]} · Cod. ${i[2]}</small></div><b>${R(i[3])}</b></div>`).join('')}<div class="res"><div><span>Subtotal</span><b>R$ 529,70</b></div><div><span>Frete – Correios PAC</span><b>R$ 24,90</b></div><div><span>Desconto (cupom RLVIP10)</span><b>– R$ 52,97</b></div><hr><div><b>Total pago</b><b>R$ 501,63</b></div></div></div>
<div class="box"><h3 style="color:#777">Código de rastreio · Correios PAC</h3><div class="code"><b id="rc">BR 476 392 018 4 SB</b><button class="btn dark" data-copy>COPIAR</button></div><h3 style="color:#777">Histórico de movimentação</h3>${ev.map(e=>`<div class="tl-i ${e[2]?'ok':'pend'}"><b>${e[0]}</b><br><small>${e[1]}</small></div>`).join('')}</div>
<div class="st" style="display:block"><small style="color:#aaa">Prazo estimado para a entrega</small><h2 style="display:block">Até 07 de maio de 2026</h2><small style="color:#aaa">Entrega em dias úteis conforme Correios PAC</small></div>`},
expedicao:()=>{const o=[['VM-2405-0018','Carlos Henrique M.','São Paulo, SP',3,524.2,'SEDEX','Separando'],['VM-2405-0017','Pedro Almeida S.','Rio de Janeiro, RJ',2,319.8,'PAC','Aguardando'],['VM-2405-0016','Rodrigo Fonseca','Belo Horizonte, MG',5,874.5,'Jadlog','Embalado'],['VM-2405-0015','Marcos Tavares','Curitiba, PR',1,189.9,'SEDEX','Despachado'],['VM-2405-0014','Gustavo Lima','Porto Alegre, RS',4,629.7,'M. Envios','Aguardando']];window._o=o;
return`<h2 style="display:block;font-size:34px">Painel de Pedidos<br><small>Terça-feira, 13 mai 2025 · Turno da manhã</small></h2><div class="kpis"><div class="kpi" style="--c:#2f8a1a"><small>TOTAL HOJE</small><b>24</b>↑ 12% vs ontem</div><div class="kpi" style="--c:#2f6b1a"><small>PENDENTES</small><b>8</b>Aguardando separação</div><div class="kpi" style="--c:#3aa7ff"><small>EM PROCESSO</small><b>5</b>Em separação agora</div><div class="kpi" style="--c:#4cd964"><small>DESPACHADOS</small><b>4</b>↑ 3 de ontem</div></div>
<div style="display:flex;gap:10px;margin:10px 0"><input id="bs" placeholder="🔍 Buscar pedido..."><select id="fs"><option value="">Todos os status</option>${['Aguardando','Separando','Embalado','Despachado'].map(s=>`<option>${s}</option>`).join('')}</select></div><table><thead><tr><th>PEDIDO<th>CLIENTE<th>PEÇAS<th>VALOR<th>TRANSPORTADORA<th>STATUS</tr></thead><tbody id="tb"></tbody></table>`},
hub:()=>{const pl=[['ML','MERCADO LIVRE',23,4820,38],['SH','SHOPEE',6,3500,50]];
return`<div style="display:flex;justify-content:space-between;align-items:center"><h2 style="display:block;font-size:30px">HUB DE INTEGRAÇÕES</h2><button class="btn dark" data-toast="Nova integração em breve">+ NOVA INTEGRAÇÃO</button></div>
<div class="kpis">${[['PLATAFORMA','3','CONECTADAS'],['PEDIDOS HOJE','47','12% VS ONTEM'],['PRODUTOS','124','ATIVOS'],['ÚLTIMO','5M','ATRÁS']].map(k=>`<div class="box"><small style="color:#777">${k[0]}</small><div style="font-size:42px">${k[1]}</div><small class="gr">${k[2]}</small></div>`).join('')}</div>
${pl.map(x=>`<div class="hub"><div class="h"><span class="ml">${x[0]}</span><b>${x[1]}</b><span class="ok-b">conectado</span><span>${x[2]}<br><small>PEDIDOS</small></span><span>${R(x[3])}<br><small>FATURAMENTO</small></span><span style="color:var(--gold)">4.8 ★<br><small>AVALIAÇÕES</small></span><button class="btn dark" style="margin-left:auto" data-toast="Configurações de ${x[1]}">⚙ CONFIGURAR</button></div><small>LOJA: RL MODA MASCULINA ${x[4]} PRODUTOS ATIVOS</small>
<div class="chk">${['SINCRONIZAR ESTOQUE','IMPORTAR PEDIDOS','ATUALIZAR PEDIDOS','RESPONDER PERGUNTAS AUTOMATICAMENTE'].map(c=>`<label><input type="checkbox" checked> ${c}</label>`).join('')}</div></div>`).join('')}
<h2>ADICIONAR NOVA PLATAFORMA</h2><div class="kpis">${[['🛒','AMAZON'],['🎵','TIK TOK SHOP'],['🌐','MAGALU'],['+','OUTRA']].map(x=>`<div class="box" style="text-align:center;cursor:pointer" data-toast="Conectar ${x[1]}"><div style="font-size:36px">${x[0]}</div><b>${x[1]}</b><br><small>+Conectar</small></div>`).join('')}</div>`}};

function rows(){const q=($('#bs')?.value||'').toLowerCase(),s=$('#fs')?.value;
$('#tb').innerHTML=window._o.filter(o=>(!s||o[6]===s)&&(o[0]+o[1]).toLowerCase().includes(q)).map(o=>`<tr><td style="color:#caa300">#${o[0]}<td>${o[1]}<br><small style="color:#666">${o[2]}</small><td style="color:#6aa6ff">${o[3]} pç<td>${R(o[4])}<td style="color:#888">${o[5]}<td><span class="pill p-${o[6]}">● ${o[6]}</span></tr>`).join('')}
function route(){const[,pg='',a]=location.hash.slice(1).split('/');const v={'':V.home,produtos:()=>V.produtos(a||'camisetas'),produto:()=>V.produto(a),login:V.login,cadastro:V.cadastro,pagamento:V.pagamento,marca:V.marca,pedido:V.pedido,expedicao:V.expedicao,hub:V.hub}[pg]||V.home;
$('#app').innerHTML=v();$('#side').classList.remove('on');scrollTo(0,0);if(pg==='expedicao'){rows();$('#bs').oninput=$('#fs').onchange=rows}
const f=$('#cep');if(f)f.oninput=()=>f.value=f.value.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2')}
document.addEventListener('click',e=>{const t=e.target,d=k=>t.closest(`[data-${k}]`),go=h=>location.hash=h;let x;
if(x=d('add')){const p=P.find(y=>y.id==x.dataset.add);ST.cart.push(p);save();toast(p.n+' adicionado ao carrinho')}
else if(x=d('buy')){ST.cart.push(P.find(y=>y.id==x.dataset.buy));save();go('#/pagamento')}
else if(d('act')){const a=d('act').dataset.act;if(a==='menu')$('#side').classList.toggle('on');if(a==='cart')go('#/pagamento');if(a==='fav')toast('♥ Favoritos em breve');if(a==='sair')localStorage.removeItem('rl_user')}
else if(d('cor')){$$('.sw').forEach(s=>s.classList.remove('on'));t.classList.add('on')}
else if(t.classList.contains('sz')){$$('.sz').forEach(s=>s.classList.remove('on'));t.classList.add('on')}
else if(t.closest('.acc'))t.closest('.acc').classList.toggle('on');
else if(d('frete')){const c=$('#cep').value;$('#fr').textContent=c.length===9?'PAC: R$ 24,90 · 8 a 12 dias úteis | SEDEX: R$ 48,90 · 3 a 5 dias úteis':'Digite um CEP válido.'}
else if(d('reserve')){toast('Tênis reservado por 15 minutos!');}
else if(d('tab')){$$('[data-tab]').forEach(b=>b.classList.remove('on'));t.classList.add('on');$('#cc').style.display=t.textContent.includes('CARTÃO')?'block':'none'}
else if(x=d('par')){ST.parc=+x.dataset.par;$$('.par').forEach(p=>p.classList.toggle('on',p===x))}
else if(d('cupom')){if($('#cp').value.toLowerCase()==='desconto10'){ST.coupon=.1;route();toast('Cupom aplicado: 10% OFF')}else toast('Cupom inválido')}
else if(d('fin')){if(!ST.cart.length)return toast('Seu carrinho está vazio');ST.cart=[];ST.coupon=0;save();toast('Pedido realizado com sucesso!');go('#/pedido')}
else if(d('copy')){navigator.clipboard?.writeText($('#rc').textContent);toast('Código copiado!')}
else if(d('toast'))toast(d('toast').dataset.toast)
else if(d('login')){const em=$('#em').value,pw=$('#pw').value;if(!/^\S+@\S+\.\S+$/.test(em))return $('#er').textContent='Digite um e-mail válido.';if(pw.length<6)return $('#er').textContent='A senha deve ter ao menos 6 caracteres.';localStorage.setItem('rl_user',em);toast('Bem-vindo!');go('#/')}
else if(d('g'))toast('Login com Google em breve')
else if(d('cad')){const er=$('#er'),c=$('#cpf').value.replace(/\D/g,'');if(!$('#c1').value||!$('#c2').value.includes('@'))return er.textContent='Preencha nome e e-mail válidos.';if(c.length!==11)return er.textContent='CPF deve ter 11 dígitos.';if($('#s1').value.length<6||$('#s1').value!==$('#s2').value)return er.textContent='Senhas devem coincidir (mín. 6 caracteres).';if(!$('#tm').checked)return er.textContent='Aceite os termos para continuar.';toast('Conta criada!');go('#/login')}});
document.addEventListener('input',e=>{if(e.target.id==='cpf')e.target.value=e.target.value.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')});
addEventListener('hashchange',route);save();route();setTimeout(()=>$('#splash').classList.add('off'),2200);
