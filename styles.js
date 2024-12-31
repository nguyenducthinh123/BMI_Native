import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { // Style cho container chính của BMIScreen
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { // Style cho tiêu đề trong Title
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#00008B",
  },
  inputGroup: { // Style cho nhóm input trong InputItem
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: { // Style cho nhãn của input trong InputItem
    fontSize: 20,
  },
  button: { // Style cho nút tăng/giảm giá trị trong InputItems
    backgroundColor: "#3399FF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: { // Style cho chữ trên nút tăng/giảm giá trị trong InputItems
    color: "#fff",
    fontSize: 18,
  },
  input: { // Style cho ô input trong InputItem
    width: 60,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 3,
    fontSize: 18,
  },
  resultRow: { // Style cho dòng kết quả trong BMIScreen
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  resultLabel: { // Style cho nhãn kết quả trong BMIScreen
    fontSize: 20,
  },
  resultValue: { // Style cho giá trị kết quả trong BMIScreen
    fontSize: 20,
    fontWeight: "bold",
  },
  bmiValue: { // Style cho giá trị BMI trong BMIScreen
    fontSize: 20,
    fontWeight: "bold",
    color: "#008000",
  },
  status: { // Style cho trạng thái trong BMIScreen
    fontSize: 20,
    fontWeight: "bold",
  },
  navigationRow: { // Style cho dòng nút điều hướng trong BMIScreen
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  navButton: { // Style cho nút điều hướng trong BMIScreen
    backgroundColor: "#3399FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navButtonText: { // Style cho chữ trên nút điều hướng trong BMIScreen
    color: "#fff",
    fontSize: 16,
  },
  infoBox: { // Style cho hộp thông tin trong ResultItem
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 10,
  },
  infoText: { // Style cho chữ trong hộp thông tin trong ResultItem
    fontSize: 16,
    color: "#333",
  },
});

export default styles;