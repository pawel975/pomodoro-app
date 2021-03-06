import { useDispatch } from "react-redux";
import { globalStateUpdate } from "../../actions";
import AppearanceSectionFontOption from "../AppearanceSectionFontOption/AppearanceSectionFontOption";

const AppearanceSectionFont = () => {

    const dispatch = useDispatch();

    const fontsParams = [
        {
            fontId: "concert-one",
            fontName: "Concert one",
        },
        {
            fontId: "arvo",
            fontName: "Arvo",
        },
        {
            fontId: "chakra-petch",
            fontName: "Chakra Petch",
        }
        
    ]

    const handleFontChange = (e) => {
        dispatch(
            globalStateUpdate({
                fontId: e.target.id,
            })
        )
    }

    const allFontsOptions = fontsParams.map(font => (
        <AppearanceSectionFontOption
            key={font.fontId}
            fontId={font.fontId}
            fontName={font.fontName}
            handleFontChange={handleFontChange}
        />
    ))

    return (
        <section 
            className='appearance-section__font'
            data-testid='appearance-section__font'
        >
            <h1>Font style</h1>
            {allFontsOptions}
        </section>

    )
}

export default AppearanceSectionFont;