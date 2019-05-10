import axios from "axios";
import { isEmpty } from "../utils/image.utils";
import { spaceWithPlus } from "../utils";

const GFONTS_BASE_URI = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${
  process.env.REACT_APP_GOOGLE_FONTS_KEY
}`;

/**
 *
 */
export const fetchGoogleFonts = async () => {
  try {
    const res = await axios.get(GFONTS_BASE_URI);
    const data = res.data.items;
    return {
      data: data,
      error: false
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: true,
        stackTrace: error
      }
    };
  }
};

export const loadGoogleFontsToWindow = async () => {
  try {
    const data = await axios.get(
      `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&category=serif&family=Peddana&key=${
        process.env.REACT_APP_GOOGLE_FONTS_KEY
      }`
    );
    return {
      data: data,
      error: false
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: true,
        stackTrace: error
      }
    };
  }
};

export const makeFontArray = fonts => {
  try {
    const data =
      fonts &&
      fonts.map(obj => {
        if (!isEmpty(obj.variants)) {
          return obj.variants.map(o => {
            return {
              name: `${obj.family} ${o}`,
              family: `${spaceWithPlus(obj.family)}:${o}`,
              type: o
            };
          });
        }
        return [];
      });
    return {
      fontArray: data,
      fontError: false
    };
  } catch (error) {
    return {
      fontArray: null,
      fontError: {
        status: true,
        stackTrace: error
      }
    };
  }
};
