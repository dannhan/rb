"use client";

import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";

const styles = StyleSheet.create({
  page: { padding: 20 },
  table: {
    display: "table",
    width: "auto",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  row: { flexDirection: "row" },
  cell: {
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
    fontSize: 10,
    textAlign: "center",
  },
  headerCell: { backgroundColor: "yellow", fontWeight: "bold" },
  numberCell: { width: 30 },
  descriptionCell: { width: 150 },
  progressCell: { width: 70 },
});

// TODO: change all printers to use this instead
const ProgressPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.row, styles.headerCell]}>
          <Text style={[styles.cell, styles.numberCell]}>NO.</Text>
          <Text style={[styles.cell, styles.descriptionCell]}>DESKRIPSI</Text>
          <Text style={[styles.cell, styles.progressCell]}>W11 18-08-23</Text>
          <Text style={[styles.cell, styles.progressCell]}>W12 25-08-23</Text>
        </View>
        {/* Table Rows */}
        {data.map((item, index) => (
          <View key={item.id} style={styles.row}>
            <Text style={[styles.cell, styles.numberCell]}>{index + 2}.</Text>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {item.description}
            </Text>
            <Text style={[styles.cell, styles.progressCell]}>
              {item.progress["11_18-08-23"] ?? ""}%
            </Text>
            <Text style={[styles.cell, styles.progressCell]}>
              {item.progress["12_25-08-23"] ?? ""}%
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PrintProgressButton = ({ data }) => (
  <PDFDownloadLink
    document={<ProgressPDF data={data} />}
    fileName="progress-report.pdf"
  >
    {({ loading }) => (
      <Button
        size="sm"
        variant="secondary"
        className="flex h-8 items-center border"
      >
        <PrinterIcon className="mr-2 h-4 w-4" />
        {loading ? "Loading..." : "Print PDF"}
      </Button>
    )}
  </PDFDownloadLink>
);

export default PrintProgressButton;
