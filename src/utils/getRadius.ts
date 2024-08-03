export default function GetRadius(width: number, index: number) {
    switch (true) {
        case width > 1200:
            return index === 1 ? 200 : index == 2 ? 300 : 400
        case width > 640:
            return index === 1 ? 150 : index == 2 ? 250 : 350
        default:
            return index === 1 ? 100 : index == 2 ? 200 : 300
    }
}
