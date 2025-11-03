import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { tBanners } from "@/types/types";
import { http } from "@/services/http";
import { toast } from "react-toastify";
import Loading from "@/components/loading";
import Carousel from "@/components/ui/carousel";

const BannerComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<null | Array<tBanners>>(null);
  const onInit = async () => {
    setIsLoading(true);
    const request = await http
      .get("/banners/current")
      .then((e) => ({ data: e.data, success: true, err: null }))
      .catch((e) => ({ data: null, success: false, err: e }));

    setIsLoading(false);
    if (request.success) {
      setBanners(request.data);
    } else {
      toast.error(request.err);
    }
  };

  const imagesFormat = useMemo(() => {
    if (!banners) return [];

    return banners.map((i) => ({
      src: `${i.arquivo}`,
      name: `${i.nome_arquivo}`,
    }));
  }, [banners]);

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <div className="flex w-full ">
      {isLoading ? <Loading /> : <Carousel images={imagesFormat} />}
    </div>
  );
};
export default memo(BannerComponent);
