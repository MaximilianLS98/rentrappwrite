'use client';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import dynamic from 'next/dynamic';

// const styles = StyleSheet.create({
// 	page: { padding: 30, fontSize: 12 },
// 	section: { marginBottom: 10 },
// 	header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
// 	text: { marginBottom: 5 },
// 	bold: { fontWeight: 'bold' },
// });
const styles = StyleSheet.create({
	page: { padding: 30, fontSize: 12 },
	section: { marginBottom: 10 },
	header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
	subHeader: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
	text: { marginBottom: 5 },
	bold: { fontWeight: 'bold' },
});

const RentalContract = ({ formData }: any) => {
	return (
		// <Document>
		// 	<Page size='A4' style={styles.page}>
		// 		<View>
		// 			<Text style={styles.header}>Leiekontrakt</Text>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Utleier :</Text>
		// 				<Text>{formData.landlordName}</Text>
		// 			</View>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Leietaker:</Text>
		// 				<Text>{formData.tenantName}</Text>
		// 			</View>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Property Address:</Text>
		// 				<Text>{formData.propertyAddress}</Text>
		// 			</View>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Lease Period:</Text>
		// 				<Text>
		// 					{formData.startDate} to {formData.endDate}
		// 				</Text>
		// 			</View>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Monthly Rent:</Text>
		// 				<Text>${formData.rentAmount}</Text>
		// 			</View>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Security Deposit:</Text>
		// 				<Text>${formData.securityDeposit}</Text>
		// 			</View>

		// 			<View style={styles.section}>
		// 				<Text style={styles.bold}>Additional Terms:</Text>
		// 				<Text>{formData.terms || 'N/A'}</Text>
		// 			</View>
		// 		</View>
		// 	</Page>
		// </Document>
		<Document>
			<Page size='A4' style={styles.page}>
				<View>
					<Text style={styles.header}>LEIEKONTRAKT</Text>

					<Text style={styles.subHeader}>1. Kontraktens parter</Text>
					<Text style={styles.bold}>Utleier:</Text>
					<Text>{formData.landlordName}</Text>
					<Text style={styles.bold}>Leietaker:</Text>
					<Text>{formData.tenantName}</Text>

					<Text style={styles.subHeader}>2. Eiendom</Text>
					<Text>{formData.propertyAddress}</Text>

					<Text style={styles.subHeader}>3. Leieobjekt</Text>
					<Text>{formData.unitDetails}</Text>

					<Text style={styles.subHeader}>4. Leie</Text>
					<Text>Leie pr måned: kr {formData.rentAmount}</Text>
					<Text>Strøm og varme: {formData.electricity}</Text>
					<Text>Vann og avløp: {formData.water}</Text>
					<Text>Internett inkludert: {formData.internet ? 'Ja' : 'Nei'}</Text>

					<Text style={styles.subHeader}>5. Varighet</Text>
					<Text>Startdato: {formData.startDate}</Text>
					<Text>Sluttdato: {formData.endDate}</Text>
					<Text>Oppsigelsestid: {formData.terminationPeriod} måneder</Text>

					<Text style={styles.subHeader}>6. Sikkerhet</Text>
					<Text>Depositum: kr {formData.securityDeposit}</Text>
					<Text>Bank: {formData.securityBank}</Text>
					<Text>Betalingsfrist: {formData.paymentDeadline}</Text>

					<Text style={styles.subHeader}>7. Utleiers plikter</Text>
					<Text>
						Utleier plikter i leietiden å stille boligen til leiertakers disposisjon i
						samsvar med denne avtale, jf. husleieloven § 5-1 (1). Utleier plikter i
						leietiden å holde boligen i den stand som følger av husleielovens kap. 2.
					</Text>

					<Text style={styles.subHeader}>8. Leietakers plikter</Text>
					<Text>
						Leietaker må følge de påbud og regler utleier setter (og eventuelt det
						regelverk som gjelder for borettslaget/sameiet/selskapet). Leietaker må for
						øvrig behandle boligen med tilbørlig aktsomhet, og ellers i tråd med avtalen
						og husleieloven kap. 5. Leietaker skal besørge vedlikehold av dørlåser,
						kraner, vannklosetter, elektriske kontakter og brytere, varmtvannsbeholdere
						og inventar og utstyr i boligen som ikke er en del av den faste eiendommen.
						Annet vedlikehold kan leietaker kun utføre etter samtykke fra utleier.
						Boligen kan ikke brukes til annet formål enn beboelse. Boligen skal holdes
						oppvarmet når det er fare for frost. Leietaker plikter å erstatte
						selvforskyldte skader, og skade som skyldes medlemmer av husstanden eller
						andre som leietaker har gitt adgang til boligen. Leietaker plikter straks å
						gi melding til utleier om skade på boligen som må utbedres uten opphold.
						Andre skader på boligen plikter leietaker å sende melding om innen rimelig
						tid. Leietaker plikter for øvrig å gjøre det som med rimelighet kan
						forventes for å avverge økonomisk tap for utleier som følge av skade som
						nevnt over.
					</Text>

					<Text style={styles.subHeader}>9. Avtalebrudd</Text>
					<Text>
						Leietaker godtar at tvangsfravikelse kan kreves hvis leien ikke blir betalt
						innen 14 dager etter at skriftlig varsel etter tvangsfullbyrdelsesloven §
						4-18 er sendt, jf. samme lov § 13-2 tredje ledd a). Leietaker godtar også at
						tvangsfravikelse kan kreves når leietiden er løpt ut, jf. § 13-2, 3. ledd b)
						i tvangsfullbyrdelsesloven. Gjør leietaker seg skyldig i vesentlige brudd på
						leieavtalen, kan leieavtalen heves, jf. husleieloven § 9-9. Leietaker
						plikter da å fraflytte boligen i den stand som følger av avtalens pkt. 12.
						Blir leieavtalen hevet, er leieren ansvarlig for utlegg, tapt leie o.l.
						etter bestemmelsene i husleieloven § 5-8.
					</Text>

					<Text style={styles.subHeader}>10. Ordensregler</Text>
					<Text>{formData.houseRules}</Text>

					<Text style={styles.subHeader}>11. Andre forhold</Text>
					<Text>
						Boligen leies ut som den er. At boligen leies ut som den er betyr at
						leietaker bærer mer av risikoen for eventuelle skjulte mangler ved boligen.
						Mangler som oppdages etter at avtalen er inngått medfører vanligvis ikke
						kontraktsbrudd så lenge utleier ikke har gitt feil eller manglende
						opplysninger og boligen ikke er i betydelig dårligere tilstand enn hva som
						er normalt ut fra månedsleie og andre relevante forhold (husleieloven §§
						2-3, 2-4, 2-5).
					</Text>
					<Text style={styles.subHeader}>12. Leieavtalens opphør</Text>
					<Text>
                        I tiden før fraflytting plikter leietaker i rimelig utstrekning, og etter avtale med utleier, å gi
                        leiesøkende adgang for å se på husrommet.
                        Ved leietidens opphør skal leietaker stille boligen med tilbehør til utleiers disposisjon. Boligen
                        med tilbehør skal være ryddet, rengjort og i samme stand som ved overtakelsen, med unntak av
                        den forringelse som skyldes alminnelig slit og elde.
					</Text>
				</View>
			</Page>
		</Document>
	);
};

const RentalContractPDF = ({ formData }: any) => {
	return (
		<>
			{/* <PDFDownloadLink
				document={<RentalContract formData={formData} />}
				fileName='rental_contract.pdf'>
				{({ loading }) => (loading ? 'Generating PDF...' : 'Download Rental Contract')}
			</PDFDownloadLink> */}
            <PDFViewer width={400} height={600}>
                <RentalContract formData={formData} />
            </PDFViewer>
		</>
	);
};

export default RentalContractPDF;
